import dbConnect from "@/app/lib/db";
import Order from "@/app/lib/models/order";

export async function PATCH(request) {
  await dbConnect();

  try {
    const { order_id, paypal_order_id, order_status } = await request.json();

    // Validate required fields
    if (!order_id || !paypal_order_id || !order_status) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Updating PayPal Order Status:", {
      order_id,
      paypal_order_id,
      order_status,
    });

    // Update the PayPal order status in the database
    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      {
        paypal_order_id,
        order_status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ success: false, error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("PayPal Order Status Updated Successfully:", updatedOrder);

    return new Response(
      JSON.stringify({ success: true, data: updatedOrder }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating PayPal order status:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to update order status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
