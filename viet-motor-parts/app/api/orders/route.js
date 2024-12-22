import dbConnect from '@/app/lib/db';
import Order from '@/app/lib/models/order';
// import { verifyAdminToken } from '@/app/lib/middleware/auth';
import Product from '@/app/lib/models/product';

export async function GET(request) {
  await dbConnect();

  const DEFAULT_LIMIT = 10;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || DEFAULT_LIMIT, 10);

  try {
    // Fetch paginated orders
    const skip = (page - 1) * limit;
    const orders = await Order.find({})
      .skip(skip)
      .limit(limit);

    // Total count for pagination metadata
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

    if (payment_method === 'Installment' && !installment_details) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing Installment Details' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
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
