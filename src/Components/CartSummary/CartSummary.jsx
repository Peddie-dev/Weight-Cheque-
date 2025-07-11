import React from "react";
import { useCart } from "../../Context/CartContext";
import { FaShieldAlt } from "react-icons/fa";

const CartSummary = () => {
  const { cart, getTotal } = useCart();

  if (!cart.length) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-primary mb-4">Your Order</h2>
      <ul className="space-y-3">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <hr className="my-4 border-gray-300 dark:border-gray-600" />
      <div className="flex justify-between font-semibold text-black dark:text-white">
        <span>Total:</span>
        <span>${getTotal()}</span>
      </div>

      {/* Security note */}
      <div className="mt-6 text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
        <FaShieldAlt className="text-orange-400 mt-0.5" />
        <p>
          Your payment is encrypted and secure. We do not store card information.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;