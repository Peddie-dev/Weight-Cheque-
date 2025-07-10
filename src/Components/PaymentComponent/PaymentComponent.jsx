import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import pesapalLogo from "../../assets/payments/pesapal.png";
import paystackLogo from "../../assets/payments/paystack.png";

const PaymentComponent = () => {
  const { getTotal } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [gateway, setGateway] = useState("pesapal"); // default

  const handlePayment = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://your-backend.com/api/payment/initiate", {
        amount: getTotal(),
        email,
        currency: "USD",
        provider: gateway,
      });

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        alert("Failed to get payment link.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Secure Checkout
        </h2>

        <p className="text-xl text-center mb-8 text-gray-700 dark:text-gray-300">
          Total Amount:{" "}
          <span className="font-bold text-gray-900 dark:text-white">${getTotal()}</span>
        </p>

        {/* Email input */}
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 text-lg rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />

          {/* Subscribe checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="subscribe"
              checked={subscribe}
              onChange={() => setSubscribe(!subscribe)}
              className="w-5 h-5 text-orange-500 bg-gray-100 dark:bg-gray-700 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="subscribe" className="text-gray-700 dark:text-gray-300 text-lg">
              Email me with news and offers
            </label>
          </div>

          {/* Payment Method Radio Buttons */}
          <div className="mt-6">
            <label className="block text-lg font-semibold mb-2">Choose Payment Method:</label>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Pesapal Option */}
              <label
                htmlFor="pesapal"
                className={`flex items-center justify-between gap-4 px-5 py-4 w-full sm:w-1/2 border rounded-lg cursor-pointer transition ${
                  gateway === "pesapal"
                    ? "border-orange-500 ring-2 ring-orange-300 dark:ring-orange-600"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="pesapal"
                    name="paymentGateway"
                    value="pesapal"
                    checked={gateway === "pesapal"}
                    onChange={() => setGateway("pesapal")}
                    className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                  />
                  <img src={pesapalLogo} alt="Pesapal" className="h-6 w-6" />
                  <span className="text-base font-medium">Pesapal</span>
                </div>
              </label>

              {/* Paystack Option */}
              <label
                htmlFor="paystack"
                className={`flex items-center justify-between gap-4 px-5 py-4 w-full sm:w-1/2 border rounded-lg cursor-pointer transition ${
                  gateway === "paystack"
                    ? "border-green-600 ring-2 ring-green-300 dark:ring-green-700"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="paystack"
                    name="paymentGateway"
                    value="paystack"
                    checked={gateway === "paystack"}
                    onChange={() => setGateway("paystack")}
                    className="w-5 h-5 text-green-600 focus:ring-green-600"
                  />
                  <img src={paystackLogo} alt="Paystack" className="h-6 w-6" />
                  <span className="text-base font-medium">Paystack</span>
                </div>
              </label>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xl font-bold py-5 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Processing..." : `Pay with ${gateway === "pesapal" ? "Pesapal" : "Paystack"}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;


