import dbConnect from '@/app/lib/db';
import Order from '@/app/lib/models/order';
import Product from '@/app/lib/models/product';
import fetch from 'node-fetch';

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    console.log("Incoming request body:", body);
    const {
      customer_name,
      email,
      phone_number,
      address,
      order_details,
      total_amount,
      payment_method,
      installment_details,
      additional_notes,
      paypal_order_id, // Added field for PayPal order ID
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
        JSON.stringify({ success: false, error: 'Missing required order fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (payment_method === 'PayPal' && !paypal_order_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing PayPal Order ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (payment_method === 'Installment' && !installment_details) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing Installment Details' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Capture PayPal payment if payment method is PayPal
    if (payment_method === 'PayPal') {
      const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
      ).toString("base64");

      try {
        const response = await fetch(
          `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypal_order_id}/capture`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${auth}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to capture PayPal payment.");
        }

        console.log("PayPal payment captured:", data);
      } catch (error) {
        console.error("PayPal capture failed:", error.message);
        return new Response(
          JSON.stringify({ success: false, error: "Failed to capture PayPal payment" }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Enrich order_details
    const enrichedOrderDetails = order_details.map((item) => ({
      product_id: item.product_id,
      product_name: item.product_name, // Add product_name directly
      quantity: item.quantity,
      price: item.price,
    }));

    const newOrderConstructor = {
      customer_name,
      email,
      phone_number,
      address,
      total_amount,
      payment_method,
      additional_notes, // Add additional_notes field
      order_details: enrichedOrderDetails, // Include enriched details
      order_status: body.order_status || "Pending",
    };

    // Add PayPal order ID if available
    if (payment_method === 'PayPal') {
      newOrderConstructor.paypal_order_id = paypal_order_id;
    }

    // Add installment_details if available
    if (payment_method === 'Installment' && installment_details) {
      newOrderConstructor.installment_details = installment_details;
    }

    // Create a new order
    const newOrder = new Order(newOrderConstructor);
    const savedOrder = await newOrder.save();
    console.log("Saved order:", savedOrder);

    // Handle stock after order
    for (const item of order_details) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        console.error('Product not found:', item.product_id);
        continue;
      }

      // Update stock
      product.stock_quantity -= item.quantity;
      await product.save();
    }

    return new Response(
      JSON.stringify({ success: true, data: savedOrder }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to create order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}