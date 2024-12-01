import { AmountSelector } from "../components/AmountSelector";
import Image from "next/image";

// Mock database with prices added
const mockDatabase = [
    { id: 1, name: "EBC Double-H Sintered Brake Pads - FA244HH", image: "/ProductPlaceholder.webp", price: 1499 },
    { id: 2, name: "Yamaha YZF R15 Chain Sprocket Set", image: "/ProductPlaceholder.webp", price: 1200 },
    { id: 3, name: "NGK Spark Plug CR7HSA", image: "/ProductPlaceholder.webp", price: 499 },
    { id: 4, name: "Mobil 1 Synthetic Motor Oil 10W-40", image: "/ProductPlaceholder.webp", price: 899 },
    { id: 5, name: "Michelin Pilot Road 4 Tires - Front", image: "/ProductPlaceholder.webp", price: 1800 },
];

// Reusable component for a single product in the cart
interface CartProductProps {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

function CartProduct({ id, name, image, price, quantity }: CartProductProps) {
    return (
        <div className="rounded-lg border border-gray-200 bg-brand-600 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href={`/products/${id}`} className="shrink-0 md:order-1">
                    <img className="h-20 w-20 dark:hidden" src={image} alt={name} />
                </a>
                <label htmlFor="counter-input" className="sr-only text-brand-100">
                    Choose quantity:
                </label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                        <AmountSelector />
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-brand-100">${price}</p>
                    </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href={`/products/${id}`} className="text-base font-medium text-brand-100 hover:underline">
                        {name}
                    </a>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                            <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                />
                            </svg>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main component for the cart product list
export function CartProductList() {
    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                {mockDatabase.map((product) => (
                    <CartProduct
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        quantity={2} // Default quantity
                    />
                ))}
            </div>
        </div>
    );
}
