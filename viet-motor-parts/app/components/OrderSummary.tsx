"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./shadcn/card";
import Button from "./Button";
import { formatCurrency } from "@/lib/utils";
import { useShoppingCart } from "../(default)/cart/useShoppingCart";
import { useEffect, useState } from "react";

type OrderSummaryProps = {
    location: 'cart' | 'checkout';
};

export default function OrderSummary(props: OrderSummaryProps) {
    const { cart, total } = useShoppingCart();
    const [clientTotal, setClientTotal] = useState<number | null>(null);
    const [clientShipping, setClientShipping] = useState<number | null>(null);

    useEffect(() => {
        setClientTotal(total);
        setClientShipping((cart && cart.length > 0) ? 30000 : 0);
    }, [total, cart]);

    return (
        <div>
            <Card className="mx-auto mb-5 text-white border-none shadow-xl lg:mb-0 bg-brand-500">
                <CardHeader>
                    <CardTitle className="text-3xl lg:text-left">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="font-bold">Subtotal:</p>
                        <p className="">{clientTotal !== null ? formatCurrency(clientTotal) : '...'}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-bold">{props.location === 'cart' ? <span>Estimated</span> : null} Shipping:</p>
                        <p className="">{clientShipping !== null ? formatCurrency(clientShipping) : '...'}</p>
                    </div>
                    <div className="flex justify-between py-3">
                        <p className="text-2xl font-bold">{props.location === 'cart' ? <span>Estimated</span> : null} Total:</p>
                        <p className="text-2xl">{clientTotal !== null && clientShipping !== null ? formatCurrency(clientTotal + clientShipping) : '...'}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                    {props.location === 'cart' ? <Button className="w-full" title="Proceed to Checkout" link="/checkout" /> : null}
                    {props.location === 'checkout' ? <button type="submit" className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl"> Place Order</button> : null}
                </CardFooter>
            </Card>
        </div>
    );
}