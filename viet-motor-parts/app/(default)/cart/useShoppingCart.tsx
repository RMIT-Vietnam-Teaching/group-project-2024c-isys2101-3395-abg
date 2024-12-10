"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    amount: number;
    image_base64: string;
};

export const useShoppingCart = () => {
    // Initialize cart from localStorage or fallback to an empty array
    const initialCart = () => {
        if (typeof window !== "undefined") {
            const cart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
            return cart;
        }
        return [];
    };

    const [cart, setCart] = useState<CartItem[]>(initialCart);

    // Initialize total from localStorage or fallback to 0
    const initialTotal = () => {
        if (typeof window !== "undefined") {
            const total = JSON.parse(localStorage.getItem("total") || "0");
            return total;
        }
        return 0;
    };

    const [total, setTotal] = useState<number>(initialTotal);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        let newTotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
        setTotal(newTotal);
        localStorage.setItem("total", JSON.stringify(newTotal));
    }, [cart]);

    const getItemById = (id: string) => {
        return cart.find((item) => item.id === id);
    };

    const getCartFromStorage = (): CartItem[] => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("shoppingCart") || "[]");
        }
        return [];
    };

    const updateCartInStorage = (newCart: CartItem[]) => {
        localStorage.setItem("shoppingCart", JSON.stringify(newCart));
        setCart(newCart);
    };

    const addToCart = (item: CartItem) => {
        const currentCart = getCartFromStorage();
        let newCart = [...currentCart];
        let itemInCart = newCart.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
            itemInCart.amount += item.amount;
        } else {
            itemInCart = { ...item };
            newCart.push(itemInCart);
        }
        updateCartInStorage(newCart);
    };

    const removeFromCart = (id: string) => {
        const item = getItemById(id);
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== id);
            return updatedCart;
        });
        toast.success(`${item?.name} removed from Cart`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    };

    const increaseAmount = (id: string) => {
        const currentCart = getCartFromStorage();
        const updatedCart = currentCart.map((item) =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
        updateCartInStorage(updatedCart);
        const item = getItemById(id);
        toast.success(`${item?.name} amount increased`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    };


    const decreaseAmount = (id: string) => {
        const currentCart = getCartFromStorage();
        const item = getItemById(id);
        if (item) {
            if (item.amount > 1) {
                const updatedCart = currentCart.map((cartItem) =>
                    cartItem.id === id
                        ? { ...cartItem, amount: cartItem.amount - 1 }
                        : cartItem
                );
                updateCartInStorage(updatedCart);
                toast.success(`${item.name} amount decreased`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            } else if (item.amount === 1) {
                removeFromCart(id);
            }
        }
    };


    return {
        cart,
        getCartFromStorage,
        total,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
    };
};
