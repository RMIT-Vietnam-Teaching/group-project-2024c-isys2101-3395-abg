import dbConnect from '@/app/lib/db';
import Order from '@/app/lib/models/order';
import { verifyAdminToken } from '@/app/lib/middleware/auth';

export async function GET(request) {
  await dbConnect();

  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized access: Missing Authorization header' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify admin token
    try {
      verifyAdminToken({ headers: { authorization: authHeader } }); // Pass headers to middleware
    } catch (error) {
      console.error('Unauthorized admin:', error.message);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch all orders
    const orders = await Order.find({});
    return new Response(
      JSON.stringify({ success: true, data: orders }),
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
