import Image from "next/image";
import { formatCurrency, getProductImage } from "@/lib/utils";
import AddToCart from "@/app/components/addToCart";
import { fetchProducts } from "./fetchProducts";


export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetchProducts(params.id);

    return {
        title: `${res.name} | Viet Motor Parts`,
        description: `${res.name} details`,
    };
}


export default async function Page({ params }: { params: { id: string } }) {
    const product = await fetchProducts(params.id);

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 flex flex-col md:flex-row">
                <div className="px-4 md:flex-1">
                    <div className="relative mb-4 h-[500px] overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700">
                        <Image
                            src={getProductImage(product.image_base64)} // Use Base64 image or fallback
                            alt={product.name || "Motor part image"}
                            fill={true}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-4">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-5xl font-extrabold text-brand-100">
                            {product.name}
                        </h2>
                        <p className="text-base text-brand-200">{product.brand}</p>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <span className="text-lg font-bold text-brand-400">Price:</span>
                            <span className="text-lg font-extrabold text-brand-200">
                                {" "}
                                {formatCurrency(product.price)}
                            </span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-brand-400">
                                In Stock:
                            </span>
                            <span className="text-lg font-extrabold text-brand-200">
                                {" "}
                                {product.stock_quantity}
                            </span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            <AddToCart
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                image_base64={product.image_base64}
                                amount={1} // Default amount to 1 when adding to cart
                                className="w-full px-4 py-2 font-bold text-white"
                            />
                        </div>
                    </div>
                    <div>
                        <span className="text-lg font-bold text-brand-600">
                            Product Description:
                        </span>
                        <p className="mt-2 text-base text-brand-100">
                            {product.description}
                        </p>
                    </div>
                    <div className="" id="compatabilityCheck">
                        <label
                            htmlFor="part-compatible"
                            className="text-lg font-bold text-brand-100"
                        >
                            Part Compatibility Check:
                        </label>
                        <input
                            type="text"
                            id="part-compatible"
                            className="mt-2 block w-full rounded-lg border border-green-500 bg-green-50 p-2.5 text-sm text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-500 dark:bg-gray-700 dark:text-green-400 dark:placeholder-green-500"
                            placeholder="Input your motor model here..."
                        />
                        <div className="order-12 col-span-1 flex items-center justify-center rounded-2xl md:order-none md:col-span-7">
                            <div className="my-3 flex flex-col items-center rounded bg-brand-400 p-3 md:flex-row">
                                <svg
                                    className="h-20 w-20 text-brand-100"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {" "}
                                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                                    <circle cx="12" cy="12" r="9" /> <path d="M9 12l2 2l4 -4" />
                                </svg>
                                <div className="ml-3 text-center md:text-left">
                                    <h1 className="mb-2 text-xl font-bold text-brand-100 md:text-2xl">
                                        Compatible!
                                    </h1>
                                    <h2 className="text-sm font-bold text-brand-100 md:text-lg">
                                        The chosen vehicle and part are compatible!
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="order-12 col-span-1 flex items-center justify-center rounded-2xl md:order-none md:col-span-7">
                            <div className="my-3 flex flex-col items-center rounded bg-brand-100 p-3 md:flex-row">
                                <svg
                                    className="h-20 w-20 text-brand-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="ml-3 text-center md:text-left">
                                    <h1 className="mb-2 text-xl font-bold text-brand-600 md:text-2xl">
                                        Not compatible!
                                    </h1>
                                    <h2 className="text-sm font-bold text-brand-600 md:text-lg">
                                        The chosen vehicle and part are not compatible!
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
