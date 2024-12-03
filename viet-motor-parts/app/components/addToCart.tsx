"use client"

import { twMerge } from "tailwind-merge";
import { useShoppingCart } from "../(default)/cart/useShoppingCart";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export default function AddToCart({ id, name, price, amount, className }: { id: string, name: string, price: number, amount: number, className?: string }) {
    const { addToCart } = useShoppingCart();

    const handleAddToCart = () => {
        addToCart({ id, name, price, amount });
    }

    return (
        <div>
            <button className={twMerge("rounded-sm bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-gradient-to-bl", className)} onClick={handleAddToCart}>Add to Cart</button>
            <ToastContainer position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </div>
    );
}