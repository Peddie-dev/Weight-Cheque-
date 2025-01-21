import React from "react";
import PaymentComponent from "../Components/PaymentComponent/PaymentComponent";
import Sidebar from "../Components/Sidebar/Sidebar";

const PaymentPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Payment Content */}
      <div className="flex-grow flex justify-center items-center">
        <PaymentComponent />
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default PaymentPage;

