"use client";

import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Textarea } from "@/app/components/shadcn/textarea";
import VietnameseAddressInput from "@/app/components/VietnameseAddressInput";
import PaymentMethod from "./paymentMethod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutProductList = dynamic(() => import("@/app/components/CheckoutProductList"), { ssr: false });
const OrderSummary = dynamic(() => import("@/app/components/OrderSummary"), { ssr: false });

export default function CheckoutPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const customer_name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone_number = formData.get("pnumber") as string;
    const address = `${formData.get("address")}, ${formData.get("ward")}, ${formData.get("district")}, ${formData.get("city")}`;
    const additional_notes = formData.get("addNotes") as string;
    const payment_method = formData.get("paymentMethod") as string;
    const cartItems = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
    const total_amount = formData.get("total") as string;

    // Enrich order_details with product_name
    const order_details = cartItems.map((item: any) => ({
      product_id: item.id,
      product_name: item.name, // Assuming `name` is included in the cartItems
      quantity: item.amount,
      price: item.price,
    }));

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name,
          email,
          phone_number,
          address,
          additional_notes,
          order_details,
          total_amount,
          payment_method,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to process your order.");
        return;
      }

      // Send confirmation email
      try {
        const emailResponse = await fetch("/api/sendInvoice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            customer_name,
            order_id: data.data._id,
            order_date: data.data.created_at,
            total_amount,
            address,
            order_details,
          }),
        });

        const emailData = await emailResponse.json();
        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email:", emailData.error);
        } else {
          console.log("Confirmation email sent successfully");
        }
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      // Store orderID and reset local storage
      setSuccess("Order placed successfully");
      setError("");
      localStorage.setItem("shoppingCart", "[]");
      localStorage.setItem("total", "0");
      sessionStorage.setItem("orderID", data.data._id);

      // Redirect to the order success page
      router.push(`/checkout/success`);
    } catch (err) {
      console.error("Error placing order:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form id="checkout" action={handleSubmit} className="container grid min-h-screen grid-cols-1 gap-5 mx-auto my-5 lg:grid-cols-9">
        <div className="grid gap-5 lg:col-span-6">
          <div className="bg-brand-600 rounded-xl p-5">
            <h1 className="p-5 text-2xl font-bold">Shipping Details</h1>
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold">Name</Label>
              <Input type="text" id="name" name="name" required className="w-full p-2 shadow-2xl" placeholder="e.g Nguyễn Văn A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pnumber" className="font-bold">Phone Number</Label>
              <Input
                type="text"
                id="pnumber"
                name="pnumber"
                required
                pattern="^0[3|5|7|8|9]\\d{8}$"
                className="w-full p-2"
                placeholder="e.g 0376543210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold">Email</Label>
              <Input type="email" id="email" name="email" required className="w-full p-2" placeholder="e.g ABG@hotmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="font-bold">Address</Label>
              <Input type="text" id="address" name="address" required className="w-full p-2" placeholder="e.g. 702 Nguyễn Văn Linh" />
            </div>
            <div className="space-y-2">
              <VietnameseAddressInput />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addNotes" className="font-bold">Additional Notes</Label>
              <Textarea
                id="addNotes"
                name="addNotes"
                className="w-full p-2 overflow-y-scroll border-none resize-y max-h-24 bg-brand-500 placeholder:text-slate-300"
                placeholder="e.g. No need to call before delivering"
              />
            </div>
            <PaymentMethod />
          </div>
        </div>
        <div className="grid order-1 col-start-1 grid-rows-3 gap-5 lg:col-span-3 lg:col-start-7 lg:order-2">
          <div className="row-span-2 h-full">
            <CheckoutProductList />
          </div>
          <div className="flex flex-col justify-end">
            <OrderSummary location="checkout" disabled={loading} />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
}
