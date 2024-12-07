"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    amount: number;
};

export const useShoppingCart = () => {

    const initialCart = () => {
        if (typeof window !== 'undefined') {
            const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
            return cart;
        }
    }
    const [cart, setCart] = useState<CartItem[]>(initialCart);

    const initialTotal = () => {
        if (typeof window !== 'undefined') {
            const total = JSON.parse(localStorage.getItem('total') || '0');
            return total;
        }
    }

    const [total, setTotal] = useState<number>(initialTotal);

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        let newTotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
        setTotal(newTotal);
        localStorage.setItem('total', JSON.stringify(newTotal));
    }, [cart]);


    const addToCart = (item: CartItem) => {
        let newCart = [...cart];
        let itemInCart = newCart.find((cartItem) => cartItem.id === item.id);
        if (itemInCart) {
            itemInCart.amount += item.amount;
        } else {
            itemInCart = { ...item };
            newCart.push(itemInCart);
        }
        setCart(newCart);
    };

    const getItemById = (id: string) => {
        return cart.find((item) => item.id === id);
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
            theme: "colored"
        });
    };

    const increaseAmount = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            );
            return updatedCart;
        });
        const item = getItemById(id);
        toast.success(`${item?.name} amount increased`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored"
        });
    };

    const decreaseAmount = (id: string) => {
        const item = getItemById(id);
        if (item) {
            if (item.amount > 1) {
                setCart((prevCart) => {
                    const updatedCart = prevCart.map((cartItem) =>
                        cartItem.id === id
                            ? { ...cartItem, amount: cartItem.amount - 1 }
                            : cartItem
                    );
                    return updatedCart;
                });
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
        total,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
    };
};
