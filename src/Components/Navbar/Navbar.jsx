import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch, IoMdMenu, IoMdCart, IoMdPerson } from "react-icons/io";
import DarkMode from "./DarkMode";
import Logo from "../../assets/CHEQUE.png";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Recipes", link: "/recipes" },
  { id: 3, name: "Articles", link: "/articles" },
  { id: 4, name: "About Us", link: "/about" },
];

const inputField =
  "w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  const dropdownRef = useRef(null);
  const authFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (authFormRef.current && !authFormRef.current.contains(event.target)) {
        setShowAuthForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowResults(query.trim() ? true : false);

    const mockResults = [
      { id: 1, title: "Keto Recipes", link: "/recipes/keto" },
      { id: 2, title: "Intermittent Fasting", link: "/articles/fasting" },
    ];
    const filtered = mockResults.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (authTab === "register") {
      const firstName = form.firstName.value.trim();
      const lastName = form.lastName.value.trim();
      const confirmPassword = form.confirmPassword.value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (firstName && lastName && email && password) {
        setUser({ name: `${firstName} ${lastName}`, email });
        setShowAuthForm(false);
      }
    } else {
      if (email && password) {
        setUser({ name: email.split("@")[0], email });
        setShowAuthForm(false);
      }
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setShowUserDropdown(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40 fixed w-full top-0 left-0">
        <div className="py-2">
          <div className="container flex justify-between items-center px-4 sm:px-8">
            <Link to="/" className="font-sans text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Weight Cheque
            </Link>
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-800 px-2 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                />
                <button
                  onClick={() =>
                    setShowResults(searchQuery.trim() ? true : false)
                  }
                  className="absolute top-1/2 -translate-y-1/2 right-3"
                >
                  <IoMdSearch className="text-gray-500 group-hover:text-primary" />
                </button>
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-md mt-1 z-50">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={result.link}
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setShowResults(false)}
                      >
                        {result.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <DarkMode />

              {/* Cart Icon */}
              <div className="relative">
                <Link to="/Cart">
                  <IoMdCart className="text-2xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* User Profile Section */}
              <div className="relative" ref={dropdownRef}>
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        setShowUserDropdown(!showUserDropdown);
                        setShowAuthForm(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <span className="font-semibold">Hi, {user.name}</span>
                      <IoMdPerson className="text-2xl" />
                    </button>

                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                        <Link
                          to="/digital-library"
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Digital Library
                        </Link>
                        <Link
                          to="/manage-account"
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Manage My Account
                        </Link>
                        <Link
                          to="/payment-methods"
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Payment Methods
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowAuthForm(!showAuthForm);
                        setShowUserDropdown(false);
                      }}
                      className="text-2xl"
                      aria-label="User Authentication"
                    >
                      <IoMdPerson />
                    </button>

                    {/* Auth Modal */}
                    {showAuthForm && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div
                          ref={authFormRef}
                          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative"
                        >
                          <button
                            onClick={() => setShowAuthForm(false)}
                            className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-red-500 dark:text-gray-300"
                          >
                            &times;
                          </button>

                          <div className="flex justify-between mb-8 border-b pb-3">
                            <button
                              onClick={() => setAuthTab("login")}
                              className={`flex-1 py-2 font-semibold ${
                                authTab === "login"
                                  ? "border-b-2 border-primary text-primary"
                                  : "text-gray-500"
                              }`}
                            >
                              Login
                            </button>
                            <button
                              onClick={() => setAuthTab("Create Account")}
                              className={`flex-1 py-2 font-semibold ${
                                authTab === "Create Account"
                                  ? "border-b-2 border-primary text-primary"
                                  : "text-gray-500"
                              }`}
                            >
                              Create Account
                            </button>
                          </div>

                          <form onSubmit={handleAuthSubmit} className="space-y-5">
                            {authTab === "Create Account" && (
                              <>
                                <div>
                                  <label className="block mb-1 font-medium">First Name</label>
                                  <input name="firstName" type="text" required className={inputField} />
                                </div>
                                <div>
                                  <label className="block mb-1 font-medium">Last Name</label>
                                  <input name="lastName" type="text" required className={inputField} />
                                </div>
                              </>
                            )}
                            <div>
                              <label className="block mb-1 font-medium">Email</label>
                              <input name="email" type="email" required className={inputField} />
                            </div>
                            <div>
                              <label className="block mb-1 font-medium">Password</label>
                              <input name="password" type="password" required className={inputField} minLength={6} />
                            </div>
                            {authTab === "Create Account" && (
                              <div>
                                <label className="block mb-1 font-medium">Confirm Password</label>
                                <input name="confirmPassword" type="password" required className={inputField} minLength={6} />
                              </div>
                            )}
                            <button
                              type="submit"
                              className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
                            >
                              {authTab === "login" ? "Login" : "Create Account"}
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button className="block sm:hidden text-2xl ml-2" onClick={toggleMenu}>
                <IoMdMenu />
              </button>
            </div>
          </div>
        </div>

        {/* LOWER NAVBAR (Desktop) - Gradient Orange */}
        <nav className="hidden sm:flex justify-center bg-gradient-to-r from-primary to-secondary py-2 text-white">
          <ul className="flex gap-10 font-semibold">
            {Menu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="hover:underline hover:text-black transition duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* LOWER NAVBAR (Mobile Dropdown) - Gradient */}
        {isMenuOpen && (
          <nav className="sm:hidden bg-gradient-to-r from-primary to-secondary py-4 px-6">
            <ul className="flex flex-col gap-4 text-white font-semibold">
              {Menu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="block w-full py-2 hover:bg-primary-dark rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Navbar;