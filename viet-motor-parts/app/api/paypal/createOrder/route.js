import { NextResponse } from "next/server";
import fetch from "node-fetch";

async function fetchExchangeRate() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate");
  }
  return 1 / data.rates.VND; // Convert VND to USD
}

export async function POST(request) {
  try {
    const { customer_name, order_details } = await request.json();

    console.log("Request received at /api/paypal/createOrder");

    // Fetch exchange rate
    const exchangeRate = await fetchExchangeRate();
    console.log("Exchange rate:", exchangeRate);

    // Prepare PayPal items and calculate total
    let itemTotal = 0;
    const items = order_details.map((item) => {
      const unitPriceUSD = (item.price * exchangeRate).toFixed(2);
      const itemTotalUSD = (unitPriceUSD * item.quantity).toFixed(2);
      itemTotal += parseFloat(itemTotalUSD);
      return {
        name: item.product_name,
        unit_amount: {
          currency_code: "USD",
          value: unitPriceUSD,
        },
        quantity: item.quantity.toString(),
      };
    });

    // Ensure itemTotal is precise
    itemTotal = itemTotal.toFixed(2);

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    // Create PayPal order
    const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
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
              value: itemTotal,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: itemTotal,
                },
              },
            },
            items,
          },
        ],
        application_context: {
          return_url: `${process.env.BACKEND_URL}/checkout/paypal`,
          cancel_url: `${process.env.BACKEND_URL}/checkout`,
          user_action: "PAY_NOW",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal API Error:", data);
      return new Response(
        JSON.stringify({ error: data.message || "Failed to create PayPal order." }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const approvalUrl = data.links.find((link) => link.rel === "approve").href;

    return new Response(
      JSON.stringify({ approvalUrl }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unhandled Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

