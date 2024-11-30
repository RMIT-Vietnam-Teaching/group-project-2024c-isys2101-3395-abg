"use client"

import { twMerge } from "tailwind-merge";
import { useShoppingCart } from "../(default)/cart/useShoppingCart";

export default function AddToCart({ id, name, price, amount, className }: { id: string, name: string, price: number, amount: number, className?: string }) {
    const { addToCart } = useShoppingCart();

    return (
        <button className={twMerge("rounded-sm bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl", className)} onClick={() => addToCart({ id, name, price, amount })}>Add to Cart</button>
    );
}