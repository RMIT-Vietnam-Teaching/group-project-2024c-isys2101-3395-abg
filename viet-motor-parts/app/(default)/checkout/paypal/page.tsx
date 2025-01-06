"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PayPalProcessingPage(): JSX.Element {
  const isProcessing = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const processPayPalOrder = async (): Promise<void> => {
      if (isProcessing.current) return;
      isProcessing.current = true;

      try {
        console.log("PayPalProcessingPage Rendered");

        const query = new URLSearchParams(window.location.search);
        const paypal_order_id = query.get("token");
        const orderID = query.get("order_id") || sessionStorage.getItem("orderID");

        if (!paypal_order_id) {
          throw new Error("Missing PayPal order ID.");
        }

        if (!orderID) {
          throw new Error("Order ID is missing. Please restart the checkout process.");
        }

        console.log("Processing PayPal Order:", { paypal_order_id, orderID });

        // Fetch PayPal Access Token
        const accessToken = await fetchPayPalAccessToken();

        // Confirm the PayPal payment status
        const paymentStatus = await checkPayPalPaymentStatus(paypal_order_id, accessToken);

        if (paymentStatus !== "APPROVED") {
          throw new Error("Payment is not approved. Please try again.");
        }

        // Capture the payment
        await capturePayPalPayment(paypal_order_id, accessToken);

        // Update the order status in the database
        const response = await fetch(`/api/paypal/updateStatus`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderID,
            paypal_order_id,
            order_status: "Confirmed",
          }),
        });

        // Validate the response
        if (!response.ok) {
          const errorText = await response.text(); // Capture raw response for debugging
          console.error("Failed to update PayPal order status:", errorText);
          throw new Error(`Failed to update PayPal order: ${errorText}`);
        }

        const data = await response.json();
        console.log("Order updated successfully:", data);

        // Redirect to the success page
        router.push(`/checkout/success?order_id=${orderID}`);
      } catch (err) {
        console.error("Error processing PayPal order:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      } finally {
        isProcessing.current = false;
      }
    };

    processPayPalOrder();
  }, [router]);

  // setError("");
  localStorage.setItem("shoppingCart", "[]");
  localStorage.setItem("total", "0");
  // sessionStorage.removeItem("orderID");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {error ? (
        <div>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Processing your order...</h1>
          <p>Please wait while we finalize your order.</p>
        </div>
      )}
    </div>
  );
}

// Helper function to fetch PayPal Access Token
async function fetchPayPalAccessToken() {
  const response = await fetch("/api/paypal/accessToken", {
    method: "GET",
  });

  if (!response.ok) {
    const errorText = await response.text(); // Log the raw response for debugging
    console.error("Failed to fetch PayPal access token:", errorText);
    throw new Error("Failed to fetch PayPal access token.");
  }

  const data = await response.json();
  return data.accessToken;
}

// Helper function to check PayPal payment status
async function checkPayPalPaymentStatus(paypal_order_id: string, accessToken: string) {
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypal_order_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to check PayPal payment status:", errorText);
    throw new Error("Failed to verify PayPal payment.");
  }

  const data = await response.json();
  return data.status;
}

// Helper function to capture PayPal payment
async function capturePayPalPayment(paypal_order_id: string, accessToken: string) {
  const response = await fetch(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypal_order_id}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to capture PayPal payment:", errorText);
    throw new Error("Failed to capture PayPal payment.");
  }

  console.log("PayPal Payment Captured Successfully");
}
