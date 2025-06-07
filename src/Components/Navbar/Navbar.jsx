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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [user, setUser] = useState(null); // No user initially
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false); // Show sign-in/create account form

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowResults(query.trim() ? true : false);
  };

  // Simple dummy sign in handler
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    if (name) {
      setUser({ name });
      setShowAuthForm(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setShowUserDropdown(false);
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40 fixed w-full top-0 left-0">
      <div className="bg-gradient-to-r from-primary to-secondary py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a
              href="#"
              className="font-sans text-2xl sm:text-3xl flex gap-2"
              aria-label="Logo Link"
            >
              <img src={Logo} alt="Logo" className="w-10" />
              Weight Cheque
            </a>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-800 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                aria-label="Search Bar"
              />
              <button
                onClick={() => setShowResults(searchQuery.trim() ? true : false)}
                aria-label="Search Button"
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

            <DarkMode />

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

            {/* User Account / Auth */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setShowUserDropdown(!showUserDropdown);
                      setShowAuthForm(false);
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={showUserDropdown}
                    aria-label="User menu"
                  >
                    <span className="text-lg font-semibold">Hi, {user.name}</span>
                    <IoMdPerson className="text-2xl" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50">
                      <Link
                        to="/digital-library"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Digital Library
                      </Link>
                      <Link
                        to="/manage-account"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Manage My Account
                      </Link>
                      <Link
                        to="/payment-methods"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Payment Methods
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400"
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
                    aria-label="User Account"
                    className="text-2xl"
                  >
                    <IoMdPerson />
                  </button>

                  {/* Sign In / Create Account Form */}
                  {showAuthForm && (
                    <div
                      ref={authFormRef}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 z-50"
                    >
                      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
                        <label className="text-gray-800 dark:text-gray-200 font-semibold">
                          Enter Your Name to Sign In
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Your Name"
                          required
                          className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          type="submit"
                          className="bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
                        >
                          Sign In / Create Account
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="sm:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              <IoMdMenu className="text-white text-3xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ul
          className={`sm:flex ${isMenuOpen ? "block" : "hidden"} sm:block items-center gap-4`}
        >
          {Menu.map((item) => (
            <li key={item.id}>
              <Link
                to={item.link}
                className="inline-block px-4 py-2 hover:text-primary duration-200"
                aria-label={item.name}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;








