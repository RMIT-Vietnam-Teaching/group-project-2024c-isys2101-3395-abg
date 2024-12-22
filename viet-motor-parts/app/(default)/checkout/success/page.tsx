import Button from "@/app/components/Button";
import { PackageCheck, TriangleAlert } from "lucide-react";
import { Metadata } from "next";
import OrderID from "./orderID";

export const metadata: Metadata = {
    title: "Checkout Success | Viet Motor Parts",
};

// Test flow for successful order placement

// This is the page that the user will see after successfully placing an order
// Check if there is an order ID in the Local Storage (pushed into client after successful order placement)
// If there is an order ID, display it to the user
// If there is no order ID, display an error message and redirect user to the homepage



export default function Page() {

    return (
        <div className="flex flex-col justify-center items-center container mx-auto gap-5">
            <div className="flex flex-col items-center">
                <div className="rounded-full p-2 bg-green-500">
                    <PackageCheck size={125} />
                </div>
                <h1 className="text-5xl font-extrabold">Order Placed</h1>
            </div>
            <div className="flex flex-col items-center gap-3">
                <p className="font-semibold">Your order has been placed successfully.</p>
                <OrderID />
                <div role="alert" className="alert alert-warning">
                    <TriangleAlert />
                    <span>Copy your Order ID now or check your email for it. <br />
                        You will lose access to the ID after this session</span>
                </div>
            </div>
            <Button title="Track Order" link="/orders" />
        </div>
    );
}