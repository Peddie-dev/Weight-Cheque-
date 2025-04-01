import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import axios from "axios";

const PaymentComponent = () => {
  const { getTotal } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://your-backend.com/api/payment/initiate", {
        amount: getTotal(),
        email,
        currency: "USD",
      });

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        alert("Failed to get payment link.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-12 w-full max-w-6xl border border-gray-200 dark:border-gray-800">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-6">
          Checkout
        </h2>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 text-center mb-8">
          Total: <span className="font-bold text-gray-900 dark:text-gray-100">${getTotal()}</span>
        </p>

        <div className="space-y-6">
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-6 py-5 text-xl border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              id="subscribe" 
              checked={subscribe} 
              onChange={() => setSubscribe(!subscribe)} 
              className="w-6 h-6 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="subscribe" className="text-gray-700 dark:text-gray-300 text-xl">
              Email me with news and offers
            </label>
          </div>

          <button 
            onClick={handlePayment} 
            disabled={loading} 
            className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold text-xl py-5 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay with Pesapal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;





