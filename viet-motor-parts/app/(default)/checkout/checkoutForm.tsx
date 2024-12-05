"use client";

import { useState } from "react";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { Label } from "@/app/components/shadcn/label";
import { Textarea } from "@/app/components/shadcn/textarea";
import VietnameseAddressInput from "@/app/components/VietnameseAddressInput";
import PaymentMethod from "./paymentMethod"; // Import PaymentMethod
import { calculateLoan } from "../calculator/calculation";

export default function CheckoutForm() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("Cash"); // Default payment method

    const handlePaymentMethodChange = (method: string) => {
        setPaymentMethod(method); // Update the payment method dynamically
    };

    const handleSubmit = async (formData: FormData) => {
        const customer_name = formData.get("name") as string;
        const phone_number = formData.get("pnumber") as string;
        const email = formData.get("email") as string;
        const address = formData.get("address") as string;
        const additional_notes = formData.get("addNotes") as string;

        // Retrieve and format cart items
        let shoppingCart = [];
        try {
            shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
        } catch (error) {
            console.error("Error parsing shoppingCart from localStorage:", error);
        }

        // Format order_details
        const order_details = shoppingCart.map((item: any) => ({
            product_id: item.id, // Match with `product_id` in the backend schema
            quantity: item.amount, // Match with `quantity` in the backend schema
            price: item.price,
        }));

        const total_amount = JSON.parse(localStorage.getItem("total") || "0");

        if (!order_details || order_details.length === 0) {
            setError("Your cart is empty.");
            return;
        }

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
                    order_details, // Properly formatted order_details
                    total_amount,
                    payment_method: paymentMethod, // Already formatted
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to process your order.");
                setSuccess("");
            } else {
                setSuccess("Order placed successfully!");
                setError("");

                // Clear form and cart
                (document.getElementById("checkoutForm") as HTMLFormElement).reset();
                localStorage.removeItem("shoppingCart");
                localStorage.removeItem("total");
            }
        } catch (err) {
            console.error("Error placing order:", err);
            setError("An unexpected error occurred. Please try again.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };



    return (
        <form
            id="checkoutForm"
            className="flex flex-col gap-4 px-5"
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleSubmit(formData);
            }}
        >
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
            {/* Integrate PaymentMethod */}
            <PaymentMethod calculateLoan={calculateLoan} />
            <div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl"
                >
                    {loading ? "Processing..." : "Checkout"}
                </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>
    );
}
