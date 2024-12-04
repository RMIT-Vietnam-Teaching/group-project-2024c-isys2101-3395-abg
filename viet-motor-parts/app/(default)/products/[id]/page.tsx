import { AmountSelector } from "@/app/components/AmountSelector";
import Image from "next/image";
import { Product } from "@/app/components/ProductCard";
import { formatCurrency } from "@/lib/utils";
import AddToCart from "@/app/components/addToCart";
import { fetchProducts } from "./fetchProducts";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetchProducts(params.id);

    return {
        title: `${res.name} | Viet Motor Parts`,
        description: `${res.name} details`,
    }
}


export default async function Page({ params }: { params: { id: string } }) {
    const product = await fetchProducts(params.id);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="h-[500px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 relative overflow-hidden">
                        <Image src="/ProductPlaceholder.webp" alt="A random motor part" fill={true} />
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-4">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-5xl font-extrabold text-brand-100">{product.name}</h2>
                        <p className="text-brand-200 text-base">
                            {product.brand}
                        </p>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <span className="font-bold text-brand-400 text-lg">Price:</span>
                            <span className="text-brand-200 text-lg font-extrabold"> {formatCurrency(product.price)}</span>
                        </div>
                        <div>
                            <span className="font-bold text-brand-400 text-lg">In Stock:</span>
                            <span className="text-brand-200 text-lg font-extrabold"> {product.stock_quantity}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            <AddToCart
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                amount={1} // Default amount to 1 when adding to cart
                                className="w-full  text-white py-2 px-4  font-bold"
                            />
                        </div>
                    </div>
                    <div>
                        <span className="font-bold text-brand-600 text-lg">Product Description:</span>
                        <p className="text-brand-100 text-base mt-2">
                            {product.description}
                        </p>
                    </div>
                    <div className="" id="compatabilityCheck">
                        <label htmlFor="part-compatible" className="font-bold text-brand-100 text-lg">Part Compatibility Check:</label>
                        <input type="text" id="part-compatible" className="mt-2 bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Input your motor model here..." />
                        <div className="col-span-1 md:col-span-7 flex justify-center items-center md:order-none order-12 rounded-2xl">
                            <div className="flex flex-col md:flex-row items-center bg-brand-400 my-3 rounded p-3">
                                <svg className="h-20 w-20 text-brand-100" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <path d="M9 12l2 2l4 -4" /></svg>
                                <div className="ml-3 text-center md:text-left">
                                    <h1 className="text-brand-100 text-xl md:text-2xl font-bold mb-2">Compatible!</h1>
                                    <h2 className="text-brand-100 text-sm md:text-lg font-bold">The chosen vehicle and part are compatible!</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-7 flex justify-center items-center md:order-none order-12 rounded-2xl">
                            <div className="flex flex-col md:flex-row items-center bg-brand-100 my-3 rounded p-3">
                                <svg className="h-20 w-20 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="ml-3 text-center md:text-left">
                                    <h1 className="text-brand-600 text-xl md:text-2xl font-bold mb-2">Not compatible!</h1>
                                    <h2 className="text-brand-600 text-sm md:text-lg font-bold">The chosen vehicle and part are not compatible!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}