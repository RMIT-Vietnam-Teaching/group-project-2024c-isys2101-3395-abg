"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./shadcn/card";
import Button from "./Button";
import { formatCurrency } from "@/lib/utils";
import { CartItem, useShoppingCart } from "../(default)/cart/useShoppingCart";

type OrderSummaryProps = {
    location: 'cart' | 'checkout';
};


export default function OrderSummary(props: OrderSummaryProps) {
    const { total, cart } = useShoppingCart();
    const estimatedShipping = (cart.length > 0) ? 30000 : 0;



    return (
        <div>
            <Card className="mx-auto mb-5 text-white border-none shadow-xl lg:mb-0 bg-brand-500">
                <CardHeader>
                    <CardTitle className="text-3xl lg:text-left">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="font-bold">Subtotal:</p>
                        <p className="">{formatCurrency(total)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-bold">Estimated Shipping:</p>
                        <p className="">{formatCurrency(estimatedShipping)}</p>
                    </div>
                    <div className="flex justify-between py-3">
                        <p className="text-2xl font-bold">Estimated Total:</p>
                        <p className="text-2xl">{formatCurrency(total + estimatedShipping)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                    {props.location === 'cart' ? <Button className="w-full" title="Proceed to Checkout" link="/checkout" /> : null}
                    {props.location === 'checkout' ? <Button className="w-full" title="Place Order" /> : null}
                </CardFooter>
            </Card>
        </div>
    );
}