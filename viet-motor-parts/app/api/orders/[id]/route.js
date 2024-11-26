import dbConnect from '@/app/lib/db';
import Order from '@/app/lib/models/order';
import jwt from 'jsonwebtoken';

export async function GET(request, { params }) {
    await dbConnect();
  
    const { id } = params;
  
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Order ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    // Extract Authorization header
    const authHeader = request.headers.get('authorization');
    const phoneNumber = request.headers.get('phone_number'); // Customer's phone number for validation
  
    if (!authHeader) {
      // No authorization header means a customer request
      if (!phoneNumber) {
        return new Response(
          JSON.stringify({ success: false, error: 'Phone number is required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Verify phone number for the order
      try {
        const order = await Order.findById(id);
  
        if (!order) {
          return new Response(
            JSON.stringify({ success: false, error: 'Order not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
          );
        }
  
        if (order.phone_number !== phoneNumber) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid phone number' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
  
        return new Response(
          JSON.stringify({ success: true, data: order }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error fetching order:', error);
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to fetch order' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  
    // Authorization header exists - Admin access
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decoded.role !== 'admin') {
        return new Response(
          JSON.stringify({ success: false, error: 'Access denied' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Admin access - fetch order
      const order = await Order.findById(id);
  
      if (!order) {
        return new Response(
          JSON.stringify({ success: false, error: 'Order not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(
        JSON.stringify({ success: true, data: order }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error verifying admin token or fetching order:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized access' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

export async function PATCH(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Order ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized access' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Access denied' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updateData = await request.json();

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on updated fields
    });

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ success: false, error: 'Order not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedOrder }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to update order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Order ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized access' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Access denied' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return new Response(
        JSON.stringify({ success: false, error: 'Order not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: deletedOrder }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting order:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to delete order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'PATCH, DELETE',
    },
  });
}
