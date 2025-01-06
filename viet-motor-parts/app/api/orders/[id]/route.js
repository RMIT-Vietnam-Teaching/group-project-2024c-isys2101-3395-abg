import dbConnect from "@/app/lib/db";
import Order from "@/app/lib/models/order";
import { jwtVerify } from "jose";
import crypto from "crypto";

export async function GET(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "Order ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const authHeader = request.headers.get("authorization");
  const phoneNumber = request.headers.get("phone_number");

  if (!authHeader) {
    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone number is required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const order = await Order.findById(id);

      if (!order) {
        return new Response(
          JSON.stringify({ success: false, error: "Order not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      if (order.phone_number !== phoneNumber) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid phone number" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, data: order }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error fetching order:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch order" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  try {
    const token = authHeader.split(" ")[1];
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (payload.role !== "admin") {
      return new Response(
        JSON.stringify({ success: false, error: "Access denied" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return new Response(
        JSON.stringify({ success: false, error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: order }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error verifying token or fetching order:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized access" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(request, { params }) {

  
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "Order ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const authHeader = request.headers.get("authorization");
  const signature = request.headers.get("webhook-signature");

  if (!authHeader && !signature) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized access" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      if (payload.role !== "admin") {
        return new Response(
          JSON.stringify({ success: false, error: "Access denied" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    } else if (signature) {
      const rawBody = await request.text();
      const generatedSignature = crypto
        .createHmac("sha256", process.env.WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");

      if (generatedSignature !== signature) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid webhook signature" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    const updateData = await request.json();
    console.log("Received PATCH request body:", updateData);

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ success: false, error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedOrder }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to update order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "Order ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized access" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const token = authHeader.split(" ")[1];
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (payload.role !== "admin") {
      return new Response(
        JSON.stringify({ success: false, error: "Access denied" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return new Response(
        JSON.stringify({ success: false, error: "Order not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: deletedOrder }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to delete order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, PATCH, DELETE",
    },
  });
}
