import { AmountSelector } from "../components/AmountSelector";
import Image from "next/image";

export function CartProductList() {
    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="/products/3" className="shrink-0 md:order-1">
                            <img className="h-20 w-20 dark:hidden" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>

                        <label htmlFor="counter-input" className="sr-only text-brand-100">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                                <AmountSelector />
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$1,499</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="/products/3" className="text-base font-medium text-brand-100 hover:underline">EBC Double-H Sintered Brake Pads - FA244HH</a>
                            <div className="flex items-center gap-4">
                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                            <img className="h-20 w-20" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>

                        <label htmlFor="counter-input" className="sr-only text-brand-100">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                                <AmountSelector />
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$598</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">RK Racing Chain 520-SO O-Ring Chain and Sprocket Kit</a>

                            <div className="flex items-center gap-4">


                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remove
                                </button>
                            </div>
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
                            <div className="flex items-center">
                                <AmountSelector />
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$1,799</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">NGK Iridium IX Spark Plug - CR9EIX</a>

                            <div className="flex items-center gap-4">


                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remove
                                </button>
                            </div>
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
                            <div className="flex items-center">
                                <AmountSelector />
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$699</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">Hiflofiltro Premium Oil Filter - HF204</a>

                            <div className="flex items-center gap-4">


                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="w-20 shrink-0 md:order-1">
                            <img className="h-20 w-20 dark:hidden" src="/ProductPlaceholder.webp" alt="A random motor part" />
                        </a>

                        <label htmlFor="counter-input" className="sr-only text-brand-100">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                                <AmountSelector />
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$2,997</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">Puig Naked New Generation Windscreen - Honda CB650R (2019-2023)</a>

                            <div className="flex items-center gap-4">


                                <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}