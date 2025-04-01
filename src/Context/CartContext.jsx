import { createContext, useContext, useState, useEffect } from "react";

// Create the Cart Context
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
    // Load cart from localStorage or start empty
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    // Sync cart changes with localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Function to decrease quantity (or remove if 1)
    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0)
        );
    };

    // Function to clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Function to get the total price
    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};
