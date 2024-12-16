import { Metadata } from "next";
import OrderTrackingVerify from "@/app/(default)/orders/OrderTrackingVerify";

export const metadata: Metadata = {
    title: "Order Tracking | Viet Motor Parts",
    description: "Viet Motor Parts's order tracking",
};

export default function orderTracking() {
    return (
        <OrderTrackingVerify/>
    );
}