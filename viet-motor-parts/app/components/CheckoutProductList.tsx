"use client"

import { useShoppingCart, CartItem } from "../(default)/cart/useShoppingCart";
import { formatCurrency, getProductImage } from "@/lib/utils";

export default function CheckoutProductList() {
    const { cart } = useShoppingCart();


    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl overflow-y-scroll">
            <div className="space-y-6">
                {cart && cart.map((product: CartItem) => (
                    <div key={product.id} className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <a href={`/products/${product.id}`} className="shrink-0 md:order-1">
                                <img className="h-20 w-20 dark:hidden" src={getProductImage(product.image_base64)} alt="A random motor part" />
                            </a>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="flex items-center text-brand-100 font-semibold">
                                    x{product.amount}
                                </div>
                                <div className="text-end md:order-4 md:w-32">
                                    <p className="text-base font-bold text-brand-100">{formatCurrency(product.price)}</p>
                                </div>
                            </div>
                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                <a href={`/products/${product.id}`} className="text-base font-medium text-brand-100 hover:underline">{product.name}</a>
                            </div>
                        </div>
                    </div>
                ))}
                <input type="text" name="cartItems" hidden value={JSON.stringify(cart)} form="checkout" />
            </div>
        </div>
    )
}