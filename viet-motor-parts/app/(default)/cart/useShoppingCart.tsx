"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    amount: number;
};

export const useShoppingCart = () => {
    // Initialize cart from localStorage or fallback to an empty array
    const [cart, setCart] = useState<CartItem[]>(
        () => JSON.parse(localStorage.getItem("shoppingCart") || "[]")
    );

    // Initialize total from localStorage or fallback to 0
    const [total, setTotal] = useState<number>(
        () => JSON.parse(localStorage.getItem("total") || "0")
    );

    // Persist cart changes to localStorage and recalculate total
    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        const newTotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
        setTotal(newTotal);
        localStorage.setItem("total", JSON.stringify(newTotal));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, amount: cartItem.amount + item.amount }
                        : cartItem
                );
            } else {
                return [...prevCart, item];
            }
        });
        toast.success(`${item.name} added to Cart`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "colored",
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== id);
            const removedItem = prevCart.find((item) => item.id === id);
            if (removedItem) {
                toast.success(`${removedItem.name} removed from Cart`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "colored",
                });
            }
            return updatedCart;
        });
    };

    const increaseAmount = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            );
            const item = updatedCart.find((item) => item.id === id);
            if (item) {
                toast.success(`${item.name} amount increased`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "colored",
                });
            }
            return updatedCart;
        });
    };

    const decreaseAmount = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) =>
                    item.id === id ? { ...item, amount: item.amount - 1 } : item
                )
                .filter((item) => item.amount > 0);
            const item = prevCart.find((item) => item.id === id);
            if (item) {
                toast.success(`${item.name} amount decreased`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    theme: "colored",
                });
            }
            return updatedCart;
        });
    };

    return {
        cart,
        total,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
    };
};
