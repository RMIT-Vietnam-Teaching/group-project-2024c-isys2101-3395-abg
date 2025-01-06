export async function POST(request) {
    await dbConnect();
  
    try {
      const body = await request.json();
      const { paypal_order_id, order_id } = body;
  
      if (!paypal_order_id || !order_id) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing PayPal order ID or order ID." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      const auth = Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
      ).toString("base64");
  
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
  
      const captureData = await captureResponse.json();
  
      if (!captureResponse.ok) {
        console.error("Failed to capture PayPal payment:", captureData);
        throw new Error(captureData.message || "Failed to capture PayPal payment.");
      }
  
      console.log("PayPal Payment Captured:", captureData);
  
      const updatedOrder = await Order.findByIdAndUpdate(
        order_id,
        { order_status: "Confirmed" },
        { new: true }
      );
  
      return new Response(
        JSON.stringify({ success: true, data: updatedOrder }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  