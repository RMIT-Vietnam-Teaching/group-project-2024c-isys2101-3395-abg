import dbConnect from "@/app/lib/db";
import Order from "@/app/lib/models/order";
import Product from "@/app/lib/models/product";
import fetch from "node-fetch";

export async function GET(request) {
  await dbConnect();

  const DEFAULT_LIMIT = 10;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || DEFAULT_LIMIT, 10);

  try {
    const skip = (page - 1) * limit;
    const orders = await Order.find({})
      .skip(skip)
      .limit(limit);
    const totalCount = await Order.countDocuments({});

    return new Response(
      JSON.stringify({
        success: true,
        data: orders,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
          limit,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
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
      installment_details,
      additional_notes,
      paypal_order_id,
    } = body;

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

    // if (payment_method === "PayPal") {
    //   if (paypal_order_id) {
    //     console.log("Starting PayPal Payment Capture for:", paypal_order_id);

    //     const auth = Buffer.from(
    //       `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    //     ).toString("base64");

    //     const response = await fetch(
    //       `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypal_order_id}/capture`,
    //       {
    //         method: "POST",
    //         headers: {
    //           Authorization: `Basic ${auth}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     const data = await response.json();
    //     console.log("Capture Response:", data);

    //     if (!response.ok) {
    //       console.error("Capture Failed:", data);
    //       throw new Error(data.message || "Failed to capture PayPal payment.");
    //     }

    //     console.log("Capture Successful. Updating Order Status...");
    //     const updatedOrder = await Order.findByIdAndUpdate(
    //       order_id,
    //       { order_status: "Confirmed" },
    //       { new: true }
    //     );
    //     console.log("Updated Order:", updatedOrder);

    //     return new Response(
    //       JSON.stringify({ success: true, data: updatedOrder }),
    //       { status: 200, headers: { "Content-Type": "application/json" } }
    //     );
    //   } else {
    //     const newOrder = await Order.create({
    //       customer_name,
    //       email,
    //       phone_number,
    //       address,
    //       total_amount,
    //       payment_method,
    //       additional_notes,
    //       order_details,
    //       order_status: "Pending",
    //     });

    //     return new Response(
    //       JSON.stringify({ success: true, data: newOrder }),
    //       { status: 201, headers: { "Content-Type": "application/json" } }
    //     );
    //   }
    // }

    if (payment_method === "Installment" && !installment_details) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing Installment Details" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const enrichedOrderDetails = order_details.map((item) => ({
      product_id: item.product_id,
      product_name: item.product_name,
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
      additional_notes,
      order_details: enrichedOrderDetails,
      order_status: body.order_status || "Pending",
    };

    if (payment_method === "Installment" && installment_details) {
      newOrderConstructor.installment_details = installment_details;
    }

    console.log("Order Creation Payload:", {
      customer_name,
      email,
      phone_number,
      address,
      total_amount,
      payment_method,
      additional_notes,
      order_details,
      paypal_order_id,
      order_status: "Pending",
    });
    

    const newOrder = await Order.create(newOrderConstructor);
    const savedOrder = await newOrder.save();

    console.log("Saved Order:", newOrder);
    console.error("Error in Order Creation:", error);


    for (const item of order_details) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        continue;
      }

      product.stock_quantity -= item.quantity;
      await product.save();
    }

    return new Response(
      JSON.stringify({ success: true, data: savedOrder }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to create order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
