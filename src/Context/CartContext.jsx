// context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ New state for subscription pricing
  const [customAmount, setCustomAmount] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleSidebar = () => setIsCartOpen((prev) => !prev);
  const closeSidebar = () => setIsCartOpen(false);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    setCustomAmount(null); // ✅ Also clear custom amount on cart clear
  };

  // ✅ Modified getTotal
  const getTotal = () => {
    if (customAmount !== null) return Number(customAmount).toFixed(2);

    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        getTotal,
        isCartOpen,
        setIsCartOpen,
        toggleSidebar,
        closeSidebar,
        customAmount,       // ✅ make accessible
        setCustomAmount,    // ✅ make accessible
      }}
    >
      {children}
    </CartContext.Provider>
  );
};