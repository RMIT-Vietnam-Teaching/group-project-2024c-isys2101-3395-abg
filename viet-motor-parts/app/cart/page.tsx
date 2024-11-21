import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/shadcn/card";
import Button from "../components/Button";
import { Metadata } from "next/types";
import { formatCurrency } from "@/lib/utils";

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
                    <div className="flex items-center justify-center w-full h-full shadow-xl rounded-xl bg-brand-500">
                        <p className="text-5xl font-extrabold">Cart List Placeholder</p>
                    </div>
                </div>
                <div className='lg:col-span-3 lg:col-start-7'>
                    <Card className="mx-auto mb-5 text-white border-none shadow-xl lg:mb-0 bg-brand-500">
                        <CardHeader>
                            <CardTitle className="text-3xl lg:text-left">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <p className="font-bold">Subtotal:</p>
                                <p className="">{formatCurrency(120000000)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-bold">Estimated Shipping:</p>
                                <p className="">{formatCurrency(50000)}</p>
                            </div>
                            <div className="flex justify-between py-3">
                                <p className="text-2xl font-bold">Estimated Total:</p>
                                <p className="text-2xl">{formatCurrency(120050000)}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start">
                            <Button className="w-full" title="Checkout" link="/checkout">
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}