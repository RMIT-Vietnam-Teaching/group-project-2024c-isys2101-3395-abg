"use client"

import Image from "next/image";
import { useShoppingCart, CartItem } from "../(default)/cart/useShoppingCart";
import { formatCurrency } from "@/lib/utils";

export function CheckoutProductList() {
    const { cart } = useShoppingCart();
    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                {cart.map((product: CartItem) => (
                    <div className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <a href={`/products/${product.id}`} className="shrink-0 md:order-1">
                                <img className="h-20 w-20 dark:hidden" src="/ProductPlaceholder.webp" alt="A random motor part" />
                            </a>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="flex items-center text-brand-100 font-semibold">
                                    x{product.amount}
                                </div>
                                <div className="text-end md:order-4 md:w-32">
                                    <p className="text-base font-bold text-brand-100">{formatCurrency(product.price)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">RK Racing Chain 520-SO O-Ring Chain and Sprocket Kit</a>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                            <img className="h-20 w-20 dark:hidden" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>

                        <label htmlFor="counter-input" className="sr-only text-brand-100">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center text-brand-100 font-semibold">
                                x4
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$1,799</p>
                            </div>
                        </div>
                    </div>
                ))}
                <input type="text" name="cartItems" hidden value={JSON.stringify(cart)} />
                ))}
            </div>
        </div>
    );
}