import dbConnect from "@/app/lib/db";
import Order from "@/app/lib/models/order";

export async function POST(request) {
  try {
    // Parse incoming request body
    const {
      paypal_order_id,
      customer_name,
      email,
      phone_number,
      address,
      total_amount,
      order_details,
      additional_notes,
    } = await request.json();

    if (!paypal_order_id || !customer_name || !email || !order_details) {
      throw new Error("Missing required fields for PayPal capture or order creation.");
    }

    console.log("Request received at /api/paypal/capturePayment");
    console.log("PayPal Order ID:", paypal_order_id);

    // Step 1: Check and capture the PayPal payment
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    let paypalData = null;

    try {
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

      paypalData = await captureResponse.json();

      if (!captureResponse.ok) {
        console.error("PayPal Capture API Error:", paypalData);

        if (paypalData.details?.[0]?.issue === "ORDER_ALREADY_CAPTURED") {
          console.log("PayPal order already captured. Proceeding with order creation.");
        } else {
          throw new Error(
            paypalData.message || "Failed to capture PayPal payment."
          );
        }
      } else {
        console.log("PayPal payment captured:", paypalData);
      }
    } catch (error) {
      if (paypalData && paypalData.details?.[0]?.issue !== "ORDER_ALREADY_CAPTURED") {
        throw error; // Re-throw if not the "ORDER_ALREADY_CAPTURED" error
      }
    }

    // Step 2: Connect to MongoDB and create the new order
    await dbConnect();

    const newOrder = new Order({
      customer_name,
      email,
      phone_number,
      address,
      total_amount,
      order_details,
      additional_notes: additional_notes || null,
      payment_method: "PayPal",
      paypal_order_id,
      order_status: "Confirmed",
    });

    const savedOrder = await newOrder.save();
    console.log("Order created in MongoDB:", savedOrder);

    // Respond with MongoDB order ID
    return new Response(
      JSON.stringify({
        success: true,
        mongodb_order_id: savedOrder._id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PayPal Payment Capture Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
