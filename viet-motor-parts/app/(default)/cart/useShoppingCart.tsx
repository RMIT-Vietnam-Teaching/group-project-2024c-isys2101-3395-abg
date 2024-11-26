import { set } from 'mongoose';
import { useState, useEffect } from 'react';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    amount: number;
};

export const useShoppingCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCart(JSON.parse(localStorage.getItem('shoppingCart') || '[]'));
        }
    }, []);



    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                // Update the amount if the item exists
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, amount: cartItem.amount + 1 }
                        : cartItem
                );
            } else {
                // Append the item if it doesn't exist
                return [...prevCart, item];
            }
        });
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const increaseAmount = (id: string) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            )
        );
    };

    const decreaseAmount = (id: string) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id
                        ? { ...item, amount: item.amount - 1 }
                        : item
                )
                .filter((item) => item.amount > 0)
        );
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
    };
};
