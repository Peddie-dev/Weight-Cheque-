import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaCreditCard, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button (Visible on Small Screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 text-white text-3xl bg-gray-800 p-2 rounded-md md:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay (for closing when clicking outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col z-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:h-auto md:w-64`}
      >
        <h1 className="text-3xl font-bold mb-6">Weight Cheque</h1>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-4">
          {SidebarLinks.map((link) => (
            <Link
              to={link.link}
              key={link.title}
              className="text-lg hover:text-primary hover:translate-x-1 duration-300"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-8 flex gap-4">
          <a href="#" className="text-2xl hover:text-primary">
            <FaInstagram />
          </a>
          <a href="#" className="text-2xl hover:text-primary">
            <FaFacebook />
          </a>
          <a href="#" className="text-2xl hover:text-primary">
            <FaLinkedin />
          </a>
        </div>

        {/* Payment Details Section */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <div className="flex items-center gap-3">
            <FaCreditCard className="text-2xl text-primary" />
            <span>Secure Card Payments</span>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            *All transactions are secure and encrypted.
          </p>
        </div>

        {/* Copyright Section */}
        <div className="mt-auto text-center text-gray-400 text-sm">
          <p>© 2025 Weight Cheque. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

