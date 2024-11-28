import Image from "next/image";

export function CheckoutProductList() {
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
                            <div className="flex items-center text-brand-100 font-semibold">
                                x2
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$1,499</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="/products/3" className="text-base font-medium text-brand-100 hover:underline">EBC Double-H Sintered Brake Pads - FA244HH</a>                            
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
                            <div className="flex items-center text-brand-100 font-semibold">
                                x1
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$598</p>
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

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">NGK Iridium IX Spark Plug - CR9EIX</a>
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
                                x3
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$699</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">Hiflofiltro Premium Oil Filter - HF204</a>
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
                            <div className="flex items-center text-brand-100 font-semibold">
                                x5
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-brand-100">$2,997</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a href="#" className="text-base font-medium text-brand-100 hover:underline">Puig Naked New Generation Windscreen - Honda CB650R (2019-2023)</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}