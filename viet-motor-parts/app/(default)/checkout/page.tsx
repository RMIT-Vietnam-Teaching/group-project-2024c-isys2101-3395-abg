import CheckoutForm from "./checkoutForm";
import PaymentMethod from "./paymentMethod";
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
                    <CheckoutForm/>
                </div>
            </div>

            {/* Right Section: Product List and Order Summary */}
            <div className="grid order-1 col-start-1 grid-rows-3 gap-5 lg:col-span-3 lg:col-start-7 lg:order-2">
                <div className="row-span-2">
                    <CheckoutProductList />
                </div>
                <div className="flex flex-col justify-end">
                    <OrderSummary location="checkout" /> {/* This is a placeholder for the OrderSummary component */}
                </div>
            </div>
        </div>
    );
}
