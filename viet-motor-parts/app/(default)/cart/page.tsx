import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/shadcn/card";
import Button from "../../components/Button";
import { Metadata } from "next/types";
import { formatCurrency } from "@/lib/utils";
import OrderSummary from "@/app/components/OrderSummary";
import { CartProductList } from "@/app/components/CartProductList";

export const metadata: Metadata = {
    title: "Shopping Cart | Viet Motor Parts",
    description: "Shopping Cart",
};



export default function Page() {
    return (
        <div className="grid grid-cols-1">
            <div className="py-10">
                <h1 className="text-5xl font-bold text-center">Your Shopping Cart</h1>
            </div>
            <div className='container grid grid-rows-2 gap-5 mx-auto lg:gap-0 lg:grid-cols-9'>
                <div className='lg:col-span-5'>
                    <div className="flex items-center justify-center w-full h-full shadow-xl rounded-xl">
                        <CartProductList />
                    </div>
                </div>
                <div className='lg:col-span-3 lg:col-start-7'>
                    <OrderSummary /> {/* This is a placeholder for the OrderSummary component */}
                </div>
            </div>
        </div>
    )
}