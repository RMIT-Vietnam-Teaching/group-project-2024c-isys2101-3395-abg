"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PayPalProcessingPage(): JSX.Element {
  const isProcessing = useRef(false); // Use ref instead of state
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const processPayPalOrder = async (): Promise<void> => {
      if (isProcessing.current) return; // Prevent duplicate triggers
      isProcessing.current = true;

      try {
        // Extract the PayPal order ID from the URL query parameters
        const query = new URLSearchParams(window.location.search);
        const paypal_order_id = query.get("token");

        if (!paypal_order_id) {
          throw new Error("Missing PayPal order ID.");
        }
        console.log("PayPal Order ID:", paypal_order_id);

        // Retrieve the order data from sessionStorage
        const orderFormData = localStorage.getItem("orderFormData");

        if (!orderFormData) {
          throw new Error("Order data is missing from sessionStorage.");
        }

        const parsedFormData = JSON.parse(orderFormData);

        // Inject the PayPal Order ID into the parsedFormData
        const updatedFormData = {
          ...parsedFormData,
          paypal_order_id,
          order_status: "Pending", // Explicit status
        };

        // Send data to backend to create the order in MongoDB
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to capture PayPal payment.");
        }

        // Store MongoDB order ID in sessionStorage under "orderID"
        sessionStorage.setItem("orderID", data.data._id);
        localStorage.setItem("shoppingCart", "[]");
        localStorage.setItem("total", "0");

        // Redirect to the success page with the MongoDB order ID
        router.push(`/checkout/success?order_id=${data.data._id}`);
      } catch (err) {
        console.error("Error processing PayPal order:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      } finally {
        isProcessing.current = false; // Allow further attempts if needed
      }
    };

    processPayPalOrder();
  }, [router]);

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
