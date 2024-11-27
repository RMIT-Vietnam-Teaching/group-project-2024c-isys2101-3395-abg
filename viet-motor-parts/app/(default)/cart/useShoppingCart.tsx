import { useState, useEffect } from 'react';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    amount: number;
};

export const useShoppingCart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('shoppingCart');
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const syncCartToLocalStorage = (updatedCart: CartItem[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
        }
    };

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.some((cartItem) => cartItem.id === item.id)
                ? prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, amount: cartItem.amount + 1 }
                        : cartItem
                )
                : [...prevCart, item];
            syncCartToLocalStorage(updatedCart);
            return updatedCart;
        });
        window.location.reload();
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== id);
            syncCartToLocalStorage(updatedCart);
            return updatedCart;
        });
        window.location.reload();
    };

    const increaseAmount = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            );
            syncCartToLocalStorage(updatedCart);
            return updatedCart;
        });
        window.location.reload();
    };

    const decreaseAmount = (id: string) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) =>
                    item.id === id ? { ...item, amount: item.amount - 1 } : item
                )
                .filter((item) => item.amount > 0);
            syncCartToLocalStorage(updatedCart);
            return updatedCart;
        });
        window.location.reload();
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        }
    }, [cart]);

    const total = cart.reduce((acc, item) => acc + item.amount * item.price, 0);

    return {
        cart,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        total,
    };
};
