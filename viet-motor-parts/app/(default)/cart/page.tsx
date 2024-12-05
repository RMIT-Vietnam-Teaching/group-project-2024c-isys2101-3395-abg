import { Metadata } from "next/types";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Shopping Cart | Viet Motor Parts",
    description: "Shopping Cart",
};

const CartProductList = dynamic(() => import("@/app/components/CartProductList"), { ssr: false });
const OrderSummary = dynamic(() => import("@/app/components/OrderSummary"), { ssr: false });


export default function Page() {
    return (
        <div className="grid grid-cols-1">
            <div className="py-10">
                <h1 className="text-5xl font-bold text-center">Your Shopping Cart</h1>
            </div>
            <div className='container grid grid-rows-2 gap-5 mx-auto lg:gap-0 lg:grid-cols-9'>
                <div className='lg:col-span-5'>
                    <div className="flex items-center justify-center w-full h-full shadow-xl rounded-xl">
                        <CartProductList /> {/* This is a placeholder for the CartProductList component */}
                    </div>
                </div>
                <div className='lg:col-span-3 lg:col-start-7'>
                    <OrderSummary location="cart" /> {/* This is a placeholder for the OrderSummary component */}
                </div>
            </div>
        </div>
    )
}