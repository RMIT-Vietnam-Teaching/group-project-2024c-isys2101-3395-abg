import Image from "next/image";
import { formatCurrency, getProductImage } from "@/lib/utils";
import AddToCart from "@/app/components/addToCart";
import { fetchProductbyID } from "./fetchProductbyID";
import { CompatCheckProductPage } from "@/app/components/CompatCheckProductPage";
import { getAuthStatus } from "@/lib/auth";
import Button from "@/app/components/Button";


export async function generateMetadata({ params }: { params: { id: string } }) {
    const res = await fetchProductbyID(params.id);

    return {
        title: `${res.name} | Viet Motor Parts`,
        description: `${res.name} details`,
    };
}


export default async function Page({ params }: { params: { id: string } }) {
    const product = await fetchProductbyID(params.id);
    const isLoggedIn = await getAuthStatus();

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
                            <span className="text-lg font-bold text-brand-100">Price:</span>
                            <span className="text-lg font-extrabold text-brand-200">
                                {" "}
                                {formatCurrency(product.price)}
                            </span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-brand-100">
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
                            {isLoggedIn ? (
                                <Button
                                    link={`/products/${product._id}/edit`}
                                    title="Edit"
                                    className="w-full font-bold"
                                />
                            ) : (
                                <AddToCart
                                    id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    image_base64={product.image_base64}
                                    amount={1} // Default amount to 1 when adding to cart
                                    className="w-full px-4 py-2 font-bold text-white"
                                />
                            )}

                        </div>
                    </div>
                    <div>
                        <span className="text-lg font-bold text-brand-100">
                            Product Description:
                        </span>
                        <p className="mt-2 text-base text-brand-200">
                            {product.description}
                        </p>
                    </div>
                    <CompatCheckProductPage product={product}/>
                </div>
            </div>
        </div>
    );
}
