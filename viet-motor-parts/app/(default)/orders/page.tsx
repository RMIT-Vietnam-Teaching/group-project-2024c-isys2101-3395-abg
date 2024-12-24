import { Metadata } from "next";
import OrderTrackingVerify from "@/app/(default)/orders/OrderTrackingVerify";
import { getAuthStatus, getAuthToken } from "@/lib/auth";
import AdminPage from "./admin/AdminOrderPage";

export const metadata: Metadata = {
    title: "Order Tracking | Viet Motor Parts",
    description: "Viet Motor Parts's order tracking",
};

export default async function Page() {
    const isLoggedIn = await getAuthStatus();
    if (isLoggedIn) {
        return <AdminPage searchParams={{ param: "1"}} />; // Default for page 1
    } else {
        return <OrderTrackingVerify />;
    }
}