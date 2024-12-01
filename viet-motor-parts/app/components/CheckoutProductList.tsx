import Image from "next/image";

export function CheckoutProductList() {
    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                {[{
                    href: "/products/3",
                    imgSrc: "/ProductPlaceholder.webp",
                    alt: "A random motor part",
                    quantity: "x2",
                    price: "$1,499",
                    title: "EBC Double-H Sintered Brake Pads - FA244HH"
                }, {
                    href: "#",
                    imgSrc: "/ProductPlaceholder.webp",
                    alt: "A random motor part",
                    quantity: "x1",
                    price: "$598",
                    title: "RK Racing Chain 520-SO O-Ring Chain and Sprocket Kit"
                }, {
                    href: "#",
                    imgSrc: "/ProductPlaceholder.webp",
                    alt: "A random motor part",
                    quantity: "x4",
                    price: "$1,799",
                    title: "NGK Iridium IX Spark Plug - CR9EIX"
                }, {
                    href: "#",
                    imgSrc: "/ProductPlaceholder.webp",
                    alt: "A random motor part",
                    quantity: "x3",
                    price: "$699",
                    title: "Hiflofiltro Premium Oil Filter - HF204"
                }, {
                    href: "#",
                    imgSrc: "/ProductPlaceholder.webp",
                    alt: "A random motor part",
                    quantity: "x5",
                    price: "$2,997",
                    title: "Puig Naked New Generation Windscreen - Honda CB650R (2019-2023)"
                }].map((product, index) => (
                    <div key={index} className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <a href={product.href} className="shrink-0 md:order-1">
                                <img className="h-20 w-20 dark:hidden" src={product.imgSrc} alt={product.alt} />
                            </a>

                            <label htmlFor="counter-input" className="sr-only text-brand-100">Choose quantity:</label>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                <div className="flex items-center text-brand-100 font-semibold">
                                    {product.quantity}
                                </div>
                                <div className="text-end md:order-4 md:w-32">
                                    <p className="text-base font-bold text-brand-100">{product.price}</p>
                                </div>
                            </div>

                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                <a href={product.href} className="text-base font-medium text-brand-100 hover:underline">
                                    {product.title}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}