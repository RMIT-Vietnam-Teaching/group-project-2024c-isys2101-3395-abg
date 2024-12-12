"use client"

import { twMerge } from "tailwind-merge";
import { useShoppingCart } from "../(default)/cart/useShoppingCart";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


export default function AddToCart({ id, name, price, amount, className, image_base64 }: { id: string, name: string, price: number, amount: number, className?: string, image_base64: string }) {
    const { addToCart } = useShoppingCart();

    const handleAddToCart = () => {
        addToCart({ id, name, price, amount, image_base64 });
        toast.success(`${name} added to Cart`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored"
        });
    }

    return (
        <div>
            <div>
                <button className={twMerge("rounded-sm bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl", className)} onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}