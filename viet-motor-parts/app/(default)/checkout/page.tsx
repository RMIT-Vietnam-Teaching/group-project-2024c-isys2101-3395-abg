import { Metadata } from "next";
import CheckoutPage from "./checkoutPage";
import { calculateLoan } from "../calculator/calculation";


export const metadata: Metadata = {
    title: "Checkout | Viet Motor Parts",
    description: "Checkout page for Viet Motor Parts",
};

export default function Page() {
    return (
        <>
            <CheckoutPage calculateLoan={calculateLoan} />
        </>
    );
}
