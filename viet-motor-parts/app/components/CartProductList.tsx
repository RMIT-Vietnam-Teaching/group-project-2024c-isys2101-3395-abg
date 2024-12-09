"use client"

import { AmountSelector } from "../components/AmountSelector";
import { useShoppingCart, CartItem } from "../(default)/cart/useShoppingCart";
import { formatCurrency, getProductImage } from "@/lib/utils";
import 'react-toastify/dist/ReactToastify.min.css';


export default function CartProductList() {
    const { cart, removeFromCart } = useShoppingCart();

    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl overflow-y-scroll">
            <div className="space-y-6">
                {cart.map((product: CartItem) => (
                    <div key={product.id} className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <a href={`/products/${product.id}`} className="shrink-0 md:order-1">
                                <img className="h-20 w-20 dark:hidden" src={getProductImage(product.image_base64)} alt="A random motor part" />
                            </a>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="flex items-center">
                                    <AmountSelector initialQuantity={product.amount} productID={product.id} />
                                </div>
                                <div className="text-end md:order-4 md:w-32">
                                    <p className="text-base font-bold text-brand-100">{formatCurrency(product.price)}</p>
                                </div>
                            </div>
                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                <a href={`/products/${product.id}`} className="text-base font-medium text-brand-100 hover:underline">{product.name}</a>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => removeFromCart(product.id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                        </svg>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
