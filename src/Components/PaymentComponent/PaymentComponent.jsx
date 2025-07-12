import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import paystackLogo from "../../assets/payments/paystack.png";

const PaymentComponent = () => {
  const { getTotal } = useCart();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [planName, setPlanName] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedPlan = params.get("plan");

    if (selectedPlan === "monthly") {
      setAmount(8);
      setPlanName("Monthly Subscription");
    } else if (selectedPlan === "yearly") {
      setAmount(80);
      setPlanName("Yearly Subscription");
    } else {
      setAmount(parseFloat(getTotal()));
      setPlanName(""); // regular cart purchase
    }
  }, [location.search, getTotal]);

  const handlePayment = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/payment/initiate", {
        amount,
        email,
        currency: "USD",
        provider: "paystack",
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Secure Checkout
        </h2>

        {planName && (
          <p className="text-sm text-center mb-2 text-blue-600 dark:text-blue-400 font-medium">
            {planName}
          </p>
        )}

        <p className="text-lg text-center mb-6 text-gray-600 dark:text-gray-300">
          You're about to pay{" "}
          <span className="font-semibold text-gray-900 dark:text-white">${amount}</span>
        </p>

        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-base rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Subscribe checkbox with brand gradient */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="checkbox"
                id="subscribe"
                checked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
                className={`appearance-none w-5 h-5 border border-gray-300 dark:border-gray-700 rounded-md
                  ${subscribe ? "bg-gradient-to-br from-[#FFA41B] to-orange-500" : "bg-white dark:bg-gray-800"}
                  focus:outline-none cursor-pointer transition duration-200`}
              />
              {subscribe && (
                <svg
                  className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <label htmlFor="subscribe" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer">
              Email me with news and offers
            </label>
          </div>

          {/* Paystack Info Box */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-800 shadow-sm">
            <img src={paystackLogo} alt="Paystack" className="h-6 w-6" />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Payment will be processed securely via Paystack
            </span>
          </div>

          {/* Pay Button */}
          <div className="flex justify-center">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="mt-4 px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;