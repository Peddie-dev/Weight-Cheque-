import React from 'react';
import Logo from "../../assets/CHEQUE.png";
import { IoMdSearch } from "react-icons/io";
import { data } from 'autoprefixer';
import DarkMode from './DarkMode'
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
    link: "/#recipes",
  },
  {
    id: 3,
    name: "Articles",
    link: "/#",
  },
  {
    id: 4,
    name: "About Us",
    link: "/about",
  },
]
const Navbar = () => {
  return (
<div className="shadow-md bg-white
dark:bg-gray-900 dark:text-white duration-200
relative z-40">

  {/* upper Navbar */}

  <div className="bg-gradient-to-r from-primary to-secondary py-2"> 
    <div className="container flex
    justify-between items-center">
    <div>
      <a href ="#"
      className="font-sans
      text-2xl sm:text-3xl flex gap-2">
        <img src={Logo} alt="Logo"
        className="w-10"/>
        Weight Cheque
      </a>
    </div>

    {/* search bar */}
    <div className="flex justify-between items-center gap-4">
      <div className="relative group hidden
      sm:block">
        <input type="text" placeholder="search"
        className="w-[200px] sm:w-[200px]
          group-hover:w-[300px] transition-all
          duration-300 rounded-full border
          border-gray-800 px-2 py-1 focus:outline-none
          focus:border-1 focus:border-primary
           dark:border-gray-500 dark:bg-gray-800"
        />
        <IoMdSearch className="text-gray-500
        group-hover:text-primary absolute 
        top-1/2 -translate-y-1/2 right-3"/>
        </div>

        {/* Darkmode switch */}
        <div>
        <div>
        <DarkMode/>
        </div>
      </div>
    </div>
  </div>
  </div>
  {/* lower navbar */}
  
<div className="flex justify-center">
  <ul className="sm:flex hidden items-center
  gap-4">
    {Menu.map((data)=> (
        <li key={data.id}>
          <a 
          href={data.link}
          className="inline-block px-4
          hover:text-primary duration-200"
          >{data.name}</a>
        </li>
      ))}
  </ul>

  </div>
  </div>
   );
  
}

export default Navbar;
