"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./shadcn/card";
import { formatCurrency } from "@/lib/utils";
import { useShoppingCart } from "../(default)/cart/useShoppingCart";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


type OrderSummaryProps = {
    location: 'cart' | 'checkout';
    disabled?: boolean;
};

export default function OrderSummary(props: OrderSummaryProps) {
    const router = useRouter();
    const { cart, total, getCartFromStorage } = useShoppingCart();
    const shippingCost = getCartFromStorage().length > 0 ? 30000 : 0;
    const finalTotal = total + shippingCost;

    const handleClick = () => {
        const currentCart = getCartFromStorage();
        if (currentCart && currentCart.length > 0) {
            router.push('/checkout');
        } else {
            toast.error("Your Cart is Empty!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    return (
        <div>
            <Card className="mx-auto mb-5 text-white border-none shadow-xl lg:mb-0 bg-brand-500">
                <CardHeader>
                    <CardTitle className="text-3xl lg:text-left">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="font-bold">Subtotal:</p>
                        <p>{formatCurrency(total)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-bold">{props.location === 'cart' ? <span>Estimated</span> : null} Shipping:</p>
                        <p>{formatCurrency(shippingCost)}</p>
                    </div>
                    <div className="flex justify-between py-3">
                        <p className="text-2xl font-bold">{props.location === 'cart' ? <span>Estimated</span> : null} Total:</p>
                        <p className="text-2xl">{formatCurrency(finalTotal)}</p>
                        <input type="text" name="total" id="total" hidden value={finalTotal} form="checkout" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    {props.location === 'cart' ? (
                        <button
                            onClick={handleClick}
                            className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl w-full"
                        >
                            Proceed to Checkout
                        </button>
                    ) : null}
                    {props.location === 'checkout' ? (
                        <button
                            type="submit"
                            className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl w-full"
                            disabled={props.disabled} form="checkout"
                        >
                            {props.disabled ? "Order Processing" : "Checkout"}
                        </button>
                    ) : null}
                </CardFooter>
            </Card>
        </div>
    );
}
