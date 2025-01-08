import { NextResponse } from "next/server";
import fetch from "node-fetch";
import Order from "@/app/lib/models/order";
import dbConnect from "@/app/lib/db";

async function fetchExchangeRate() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate");
  }
  return 1 / data.rates.VND; // Convert VND to USD
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      customer_name,
      email,
      phone_number,
      address,
      order_details,
      total_amount,
      payment_method,
      additional_notes,
      order_id, // Extract order_id from the request body
      paypal_order_id, // For capturing payment after approval
    } = body;

    // Validate required fields
    if (
      !customer_name ||
      !email ||
      !phone_number ||
      !address ||
      !order_details ||
      !total_amount ||
      !payment_method
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required order fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch exchange rate to calculate USD values
    const exchangeRate = await fetchExchangeRate();
    let itemTotal = 0;

    const items = order_details.map((item) => {
      const unitPriceUSD = (item.price * exchangeRate).toFixed(2);
      const itemTotalUSD = (unitPriceUSD * item.quantity).toFixed(2);
      itemTotal += parseFloat(itemTotalUSD);
      return {
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price,
        price_usd: unitPriceUSD,
      };
    });

    if (payment_method === "PayPal" && paypal_order_id) {
      // Capture payment
      const auth = Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
      ).toString("base64");

      const captureResponse = await fetch(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypal_order_id}/capture`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
        }
      );

      const captureData = await captureResponse.json();

      if (!captureResponse.ok) {
        console.error("Failed to capture PayPal payment:", captureData);
        throw new Error(captureData.message || "Failed to capture PayPal payment.");
      }

      console.log("PayPal Payment Captured:", captureData);

      // Update the order status in the database
      const updatedOrder = await Order.findByIdAndUpdate(
        order_id,
        { order_status: "Confirmed" },
        { new: true }
      );

      return new Response(
        JSON.stringify({ success: true, data: updatedOrder }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 1: Create the order in the database if not capturing
    const newOrder = await Order.create({
      customer_name,
      email,
      phone_number,
      address,
      total_amount: parseFloat(total_amount),
      payment_method,
      additional_notes: additional_notes || null,
      order_details: items,
      order_status: "Pending",
    });

    console.log("Order Created in Database:", newOrder);

    let approvalUrl = null;

    // Step 2: If PayPal is selected, create the PayPal order
    if (payment_method === "PayPal") {
      const auth = Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
      ).toString("base64");

      const paypalResponse = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: `Order for ${customer_name}`,
              amount: {
                currency_code: "USD",
                value: itemTotal.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: itemTotal.toFixed(2),
                  },
                },
              },
              items: items.map((item) => ({
                name: item.product_name,
                unit_amount: {
                  currency_code: "USD",
                  value: item.price_usd,
                },
                quantity: item.quantity.toString(),
              })),
            },
          ],
          application_context: {
            return_url: `${process.env.BACKEND_URL}/checkout/paypal?order_id=${newOrder._id}`, // Include the order ID
            cancel_url: `${process.env.BACKEND_URL}/orders/${newOrder._id}?phone_number=${newOrder.phone_number}`,
          },
        }),
      });

      console.log("Return URL:", `${process.env.BACKEND_URL}/checkout/paypal`);

      const paypalData = await paypalResponse.json();

      if (!paypalResponse.ok) {
        console.error("Failed to create PayPal order:", paypalData);
        throw new Error(paypalData.message || "Failed to create PayPal order.");
      }

      // Update the order with the PayPal ID
      newOrder.paypal_order_id = paypalData.id;
      await newOrder.save();

      // Capture approval URL
      approvalUrl = paypalData.links.find((link) => link.rel === "approve").href;

      console.log("PayPal Order Created:", paypalData);
    }

    // Return the approval URL for PayPal or the order data for other methods
    if (payment_method === "PayPal") {
      return new Response(
        JSON.stringify({ approvalUrl, orderId: newOrder._id }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: newOrder }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
