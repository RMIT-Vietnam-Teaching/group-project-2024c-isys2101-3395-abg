import { AmountSelector } from "@/app/components/AmountSelector";
import Image from "next/image";
import { Product } from "@/app/components/ProductCard";
import { formatCurrency } from "@/lib/utils";
import AddToCart from "@/app/components/addToCart";


export async function fetchProducts(id: string) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    const data = await res.json();
    const product: Product = data.data;
    return product;
}

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
        <div className="h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[500px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 relative overflow-hidden">
                            <Image src="/ProductPlaceholder.webp" alt="A random motor part" fill={true} />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <AddToCart id={product._id} name={product.name} price={product.price} amount={1} className="w-full bg-brand-600 text-white py-2 px-4 rounded-full font-bold hover:bg-brand-500" />
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-brand-600 py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-3xl font-bold text-brand-100 mb-2">{product.name}</h2>
                        <p className="text-brand-200 text-base mb-4">
                            {product.brand}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-brand-600 text-lg">Price:</span>
                                <span className="text-brand-200 text-lg font-extrabold"> {formatCurrency(product.price)}</span>
                            </div>
                            <div>
                                <span className="font-bold text-brand-600 text-lg">In Stock:</span>
                                <span className="text-brand-200 text-lg font-extrabold"> {product.stock_quantity}</span>
                            </div>
                        </div>
                        <div className="mb-4">
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
                        <div className="mb-4">
                            <label htmlFor="quantity-input" className="font-bold block mb-2 text-brand-100 text-lg">Choose quantity:</label>
                            <AmountSelector />
                        </div>
                        <div>
                            <span className="font-bold text-brand-600 text-lg">Product Description:</span>
                            <p className="text-brand-100 text-base mt-2">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}