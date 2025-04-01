import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart, removeFromCart, decreaseQuantity, addToCart, clearCart, getTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <span className="font-semibold">{item.name}</span>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => decreaseQuantity(item.id)}
                                        className="bg-gray-300 px-3 py-1 rounded-l"
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-gray-300 px-3 py-1 rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-lg font-semibold">Total: ${getTotal()}</p>
                        <button
                            onClick={clearCart}
                            className="text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Clear Cart
                        </button>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
                    >
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default CartPage;
