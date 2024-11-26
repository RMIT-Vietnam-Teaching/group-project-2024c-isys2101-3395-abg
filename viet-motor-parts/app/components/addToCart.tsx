"use client"

import { useShoppingCart } from "../(default)/cart/useShoppingCart";



export default function AddToCart({ id, name, price, amount }: { id: string, name: string, price: number, amount: number }) {
    const { addToCart } = useShoppingCart();

    return (
        <button className="rounded-lg bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl" onClick={() => addToCart({ id, name, price, amount })}>Add to Cart</button>
    );
}