import { Metadata } from "next";
import OrderTrackingVerify from "@/app/(default)/orders/OrderTrackingVerify";


export const metadata: Metadata = {
    title: "Order Tracking | Viet Motor Parts",
    description: "Viet Motor Parts' order tracking",
};

export default async function Page() {
    return <OrderTrackingVerify />;
}