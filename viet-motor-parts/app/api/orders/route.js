import dbConnect from "@/app/lib/db";
import Order from "@/app/lib/models/order";
import Product from "@/app/lib/models/product";
import fetch from "node-fetch";

export async function GET(request) {
  await dbConnect();

  const DEFAULT_LIMIT = 10;
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status')?.split(',') || [];
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || DEFAULT_LIMIT, 10);
  const sortBy = searchParams.get('sortBy') || 'customer_name';
  const order = searchParams.get('order') || 'asc';
  const priceFrom = parseInt(searchParams.get('priceFrom') || '0', 10);
  const priceTo = parseInt(searchParams.get('priceTo') || 'Infinity', 10);
  const paymentMethod = searchParams.get('paymentMethod')?.split(',') || '';

  try {
    //Begin of new code
    const validSortFields = ['customer_name','total_amount'];
    const validOrders = ['asc', 'desc'];

    if (!validSortFields.includes(sortBy) || !validOrders.includes(order)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid sortBy or order parameter. Use "customer_name" or "total_amount" for sortBy and "asc" or "desc" for order.',
        }),
        { status: 400 }
      );
    }

    const sortOrder = order === 'asc' ? 1 : -1;

    const statusFilter = status.length ? { order_status: { $in: status } } : {};

    const paymentMethodFilter = paymentMethod.length ? { payment_method: { $in: paymentMethod } } : {};

    const priceFilter = {};
    if (priceFrom && !priceTo && !isNaN(priceFrom)) {
      priceFilter.$gte = parseInt(priceFrom, 10);
    } else if (!priceFrom && priceTo && !isNaN(priceTo)) {
      priceFilter.$lte = parseInt(priceFrom, 10);
    } else if (!isNaN(priceFrom) && !isNaN(priceTo) && priceFrom < priceTo) {
      priceFilter.$gte = parseInt(priceFrom, 10);
      priceFilter.$lte = parseInt(priceTo, 10);
    } else if (!isNaN(priceTo) && !isNaN(priceFrom) && priceFrom > priceTo) {
      priceFilter.$lte = parseInt(priceFrom, 10);
      priceFilter.$gte = parseInt(priceTo, 10);
    }

    const filter = {
      ...statusFilter,
      ...paymentMethodFilter,
      // name: { $regex: query, $options: 'i' }, // Case-insensitive regex search
    };

    if (Object.keys(priceFilter).length > 0) {
      filter.total_amount = priceFilter;
    }

    // Fetch paginated orders
    const skip = (page - 1) * limit;
    const orders = await Order.find(filter) //If pass filter in it return nothing (successful but nothing) even when not filtering.
      .sort({ [sortBy]: sortOrder }) //Also this doesn't work when switch to other type of sorting
      .skip(skip)
      .limit(limit);

    // Total count for pagination metadata
    const totalCount = await Order.countDocuments(filter);

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
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
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

    if (payment_method === "PayPal" && !paypal_order_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing PayPal Order ID" }),
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

    if (payment_method === "PayPal" && paypal_order_id) {
      newOrderConstructor.paypal_order_id = paypal_order_id;
    }



    const newOrder = await Order.create(newOrderConstructor);
    const savedOrder = await newOrder.save();

    console.log("Saved Order:", newOrder);


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
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
