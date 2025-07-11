import React from "react";
import { useCart } from "../Context/CartContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CartSidebar = () => {
  const {
    cart,
    removeFromCart,
    decreaseQuantity,
    addToCart,
    getTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();
   // 👇 Prevent scroll when sidebar is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar (Desktop) & Drawer (Mobile) */}
      <div
        className={`fixed z-50 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out
          w-full sm:max-w-sm
          h-[90vh] sm:h-full
          bottom-0 sm:top-0
          right-0
          rounded-t-2xl sm:rounded-none
          flex flex-col
          ${
            isCartOpen
              ? "translate-y-0 sm:translate-x-0"
              : "translate-y-full sm:translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-primary">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-primary dark:hover:text-white"
          >
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
          {totalItems === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your cart is currently empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-3 border-b pb-2 dark:border-gray-700"
              >
                <div className="w-2/3">
                  <h3 className="font-semibold text-black dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-primary hover:text-white"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded hover:bg-primary hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Section */}
        {totalItems > 0 && (
          <div className="border-t p-4 bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Total:
              </span>
              <span className="text-black dark:text-white font-bold">
                ${getTotal()}
              </span>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setTimeout(() => {
                  navigate("/payment");
                }, 300); // Match transition duration
              }}
              className="w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;