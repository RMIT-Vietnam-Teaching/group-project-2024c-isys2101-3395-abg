import CheckoutForm from "./checkoutForm";
import PaymentMethod from "./paymentMethod";
import { calculateLoan } from "../calculator/page";
import CheckoutProductList from "@/app/components/CheckoutProductList";
import OrderSummary from "@/app/components/OrderSummary";

export default function Page() {
    return (
        <div className="container grid min-h-screen grid-cols-1 gap-5 mx-auto my-5 lg:grid-cols-9">
            {/* Left Section: Shipping Details and Payment Method */}
            <div className="grid gap-5 lg:col-span-6">
                {/* Shipping Details */}
                <div className="bg-brand-600 rounded-xl">
                    <h1 className="p-5 text-2xl font-bold">Shipping Details</h1>
                    <CheckoutForm calculateLoan={calculateLoan} />
                </div>
            </div>

            {/* Right Section: Product List and Order Summary */}
            <div className="grid gap-5 lg:col-span-3">
                {/* Product List */}
                <div className="bg-brand-500 rounded-xl">
                    <CheckoutProductList />
                </div>

                {/* Order Summary */}
                <div className="bg-brand-500 rounded-xl ">
                    <OrderSummary location="checkout" />
                </div>
            </div>
        </div>
    );
}
