import React, { useState } from 'react';
import Logo from "../../assets/CHEQUE.png";
import { IoMdSearch, IoMdMenu } from "react-icons/io";
import DarkMode from './DarkMode';
import { Link } from 'react-router-dom';

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Recipes",
    link: "/recipes",
  },
  {
    id: 3,
    name: "Articles",
    link: "/articles",
  },
  {
    id: 4,
    name: "About Us",
    link: "/about",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40 fixed w-full top-0 left-0">

      {/* Upper Navbar */}
      <div className="bg-gradient-to-r from-primary to-secondary py-2"> 
        <div className="container flex justify-between items-center">
          <div>
            <a href="#"
              className="font-sans text-2xl sm:text-3xl flex gap-2"
              aria-label="Logo Link">
              <img src={Logo} alt="Logo" className="w-10" />
              Weight Cheque
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-800 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                aria-label="Search Bar"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* Dark Mode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
          
          {/* Hamburger Menu for Mobile */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              <IoMdMenu className="text-white text-3xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="flex justify-center">
        <ul className={`sm:flex ${isMenuOpen ? 'block' : 'hidden'} sm:block items-center gap-4`}>
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
