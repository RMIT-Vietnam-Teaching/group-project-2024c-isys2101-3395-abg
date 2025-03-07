"use client";

import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Textarea } from "@/app/components/shadcn/textarea";
import VietnameseAddressInput from "@/app/components/VietnameseAddressInput";
import PaymentMethod from "./paymentMethod";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { LoanCalculationResult } from "../calculator/calculation";
import { CartItem } from "../cart/useShoppingCart";
import { TriangleAlert } from "lucide-react";
import { useShoppingCart } from "../cart/useShoppingCart";




const CheckoutProductList = dynamic(() => import("@/app/components/CheckoutProductList"), { ssr: false });
const OrderSummary = dynamic(() => import("@/app/components/OrderSummary"), { ssr: false });


export default function CheckoutPage({ calculateLoan }: { calculateLoan: (formData: FormData) => Promise<LoanCalculationResult> }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { getCartFromStorage } = useShoppingCart();
  const router = useRouter();


  const handleSubmit = async (formData: FormData) => {
    const customer_name = formData.get("name") as string;
    const phone_number = formData.get("pnumber") as string;
    const email = formData.get("email") as string;
    const address = `${formData.get("address")}, ${formData.get("ward")}, ${formData.get("district")}, ${formData.get("city")}`;
    const additional_notes = formData.get("addNotes") as string;
    const payment_method = formData.get("paymentMethod") as string;
    const cartItems = formData.get("cartItems") as string;
    const total_amount = formData.get("total") as string;
    const order_details = JSON.parse(cartItems).map((item: CartItem) => ({
      product_id: item.id,
      product_name: item.name,
      quantity: item.amount,
      price: item.price
    }));
    let installment_details;
    if (payment_method === "Installment") {
      installment_details = {
        down_payment: parseFloat(formData.get("downPayment") as string),
        loan_term: parseInt(formData.get("loanTerm") as string, 10),
        monthly_payment: parseFloat(formData.get("monthlyPayment") as string),
        interest_rate: parseFloat(formData.get("interestRate") as string),
        total_with_interest: parseFloat(formData.get("installmentTotal") as string),
      };
    }
  
    if (payment_method === "PayPal") {
      setLoading(true);
    
      try {
        // Step 1: Send all order data to the backend
        const response = await fetch("/api/paypal/createOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_name,
            phone_number,
            email,
            address,
            additional_notes: additional_notes || null,
            order_details,
            total_amount: parseFloat(total_amount),
            payment_method: "PayPal",
          }),
        });
    
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to create PayPal order.");
        }
    
        console.log("PayPal Order Data:", data);
        sessionStorage.setItem("orderID", data.orderId);
    
        // Step 2: Send the confirmation email
        try {
          const emailResponse = await fetch("/api/sendInvoice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              customer_name,
              order_id: data.orderId,
              order_date: data.created_at,
              total_amount,
              address,
              order_details,
              additional_notes,
              phone_number,
              payment_method,
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
    
        // Step 3: Redirect to PayPal for payment approval
        window.location.href = data.approvalUrl;
      } catch (err) {
        console.error("Error handling PayPal order:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    
      return; // Exit the flow to avoid executing other payment logic
    }
    
    
  
    // Logic for non-PayPal orders
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name,
          phone_number,
          email,
          address,
          additional_notes,
          order_details,
          total_amount,
          payment_method,
          ...(installment_details && { installment_details }),
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
            additional_notes,
            phone_number,
            payment_method,
            ...(installment_details && { installment_details }),
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
    <>
      <form id="checkout" action={handleSubmit}></form>
      <div className="container grid min-h-screen grid-cols-1 gap-5 mx-auto my-5 lg:grid-cols-9">
        <div className="grid gap-5 lg:col-span-6">
          <div className="bg-brand-600 rounded-xl p-5 flex flex-col">
            <div className="">
              <h1 className="p-5 text-2xl font-bold">Shipping Details</h1>
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold">Name</Label>
                <Input type="text" id="name" name="name" required className="w-full p-2 shadow-2xl" placeholder="e.g Nguyễn Văn A" form="checkout" />
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
                  form="checkout"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold">Email</Label>
                <Input type="email" id="email" name="email" required className="w-full p-2" placeholder="e.g ABG@hotmail.com" form="checkout" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="font-bold">Address</Label>
                <Input type="text" id="address" name="address" required className="w-full p-2" placeholder="e.g. 702 Nguyễn Văn Linh" form="checkout" />
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
                  form="checkout"
                />
              </div>
            </div>
            <PaymentMethod calculateLoan={calculateLoan} />
          </div>
        </div>
        <div className="grid order-1 col-start-1 grid-rows-3 gap-5 lg:col-span-3 lg:col-start-7 lg:order-2">
          <div className="row-span-2 h-full">
            <CheckoutProductList />
          </div>
          <div className="flex flex-col justify-end">
            <OrderSummary location="checkout" disabled={loading} />
            {error &&
              <div role="alert" className="alert alert-warning">
                <TriangleAlert />
                {error}
              </div>
            }
            {success &&
              <div role="alert" className="alert alert-success">
                <TriangleAlert />
                {success}
              </div>
            }
          </div>
        </div>

      </div>
    </>
  );
}
