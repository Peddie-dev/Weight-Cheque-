import React from "react";
import PaymentComponent from "../Components/PaymentComponent/PaymentComponent";
import CartSummary from "../Components/CartSummary/CartSummary";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const plan = new URLSearchParams(location.search).get("plan");

  const isSubscription = plan === "monthly" || plan === "yearly";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10 md:px-10">
      <div className={`max-w-6xl mx-auto grid ${isSubscription ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"} gap-10`}>
        {/* Main Payment Form */}
        <div className={isSubscription ? "" : "lg:col-span-2"}>
          <h1 className="text-2xl font-bold mb-6 text-primary">Checkout</h1>
          <PaymentComponent />
        </div>

        {/* Cart Summary (Only if not a subscription) */}
        {!isSubscription && (
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;