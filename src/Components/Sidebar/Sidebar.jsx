import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaCreditCard,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBookOpen,
  FaShieldAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase"; // Adjust this path to your firebase config

const SidebarLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/about" },
  { title: "Digital Library", link: "/digital-library" }, // updated link text and path
  { title: "Subscriptions", link: "/subscriptions" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const location = useLocation();

  // Auto-close on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Fetch user from Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.displayName || user.email?.split("@")[0];
        setUserName(name);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 text-white text-3xl bg-gray-800 p-2 rounded-md md:hidden"
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-72 h-screen p-6 shadow-xl md:sticky md:top-[64px] md:block hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-orange-500">Weight Cheque</h1>
          <p className="text-xs text-gray-400">Your health, your journey.</p>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg mb-6">
          <FaUserCircle className="text-3xl text-orange-400" />
          <div>
            <p className="text-sm font-semibold">Hi, {userName}</p>
            <p className="text-xs text-gray-400 truncate">
              {userName === "Guest" ? "Not signed in" : ""}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 mb-8">
          {SidebarLinks.map((link) => (
            <Link
              key={link.title}
              to={link.link}
              className="text-sm text-gray-300 hover:text-orange-400 flex items-center gap-2"
            >
              <FaBookOpen className="text-sm" />
              {link.title}
            </Link>
          ))}
        </nav>

        <hr className="border-gray-700 mb-6" />

        {/* Payment Security */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <FaShieldAlt className="text-orange-400" />
            Secure Checkout
          </h2>
          <p className="text-xs text-gray-400">
            All payments are SSL encrypted. We never store your card details.
          </p>
        </div>

        {/* Help */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <FaQuestionCircle className="text-orange-400" />
            Need Help?
          </h2>
          <Link to="/faq" className="text-xs text-orange-300 hover:underline">
            Visit FAQs
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            support@weightcheque.com
          </p>
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-gray-400 text-xl mb-6">
          <a href="#"><FaInstagram className="hover:text-orange-400" /></a>
          <a href="#"><FaFacebook className="hover:text-orange-400" /></a>
          <a href="#"><FaLinkedin className="hover:text-orange-400" /></a>
        </div>

        {/* Footer */}
        <div className="mt-auto text-xs text-center text-gray-500 pt-4 border-t border-gray-700">
          Trusted by 10,000+ users <br />
          © 2025 Weight Cheque
        </div>
      </aside>

      {/* Mobile Slide-in */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setIsOpen(false)} className="text-2xl text-white mb-4">
          <FaTimes />
        </button>
        <h1 className="text-2xl font-bold text-orange-500 mb-6">Weight Cheque</h1>

        <nav className="flex flex-col gap-4 mb-6">
          {SidebarLinks.map((link) => (
            <Link
              key={link.title}
              to={link.link}
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-300 hover:text-orange-400 flex items-center gap-2"
            >
              <FaBookOpen className="text-sm" />
              {link.title}
            </Link>
          ))}
        </nav>

        <hr className="border-gray-700 mb-6" />
        <p className="text-xs text-gray-400">support@weightcheque.com</p>
      </div>
    </>
  );
};

export default Sidebar;
