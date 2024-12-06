import { Metadata } from "next";
import CheckoutPage from "./checkoutPage";


export const metadata: Metadata = {
    title: "Checkout | Viet Motor Parts",
    description: "Checkout page for Viet Motor Parts",
};

export default function Page() {
    return (
        <>
            <CheckoutPage />
        </>
    );
}
