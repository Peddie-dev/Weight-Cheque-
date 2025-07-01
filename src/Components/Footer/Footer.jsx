import React from "react";
import footerLogo from "../../assets/CHEQUE.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Recipes",
    link: "/#recipes",
  },
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "Articles",
    link: "/#articles",
  },
];

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container">
        <div className="grid md:grid-cols-3 py-8">
          {/* Company Details */}
          <div className="py-8 px-4">
            <img src={footerLogo} alt="Footer Logo" className="max-w-[50px]" />
            <p className="mt-4 text-gray-300">
              Our mission is to build healthy nutrition habits by providing
              practical and affordable weight loss meal plans that suit your
              lifestyle and budget.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-3xl text-xl font-bold mb-3">Links</h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      key={link.title}
                      className="cursor-pointer hover:text-primary hover:translate-x-1 transition duration-300 text-gray-300"
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social + Contact */}
            <div className="px-4 py-8">
              <div className="flex items-center gap-4 mb-6">
                <a href="#"><FaInstagram className="text-2xl" /></a>
                <a href="#"><FaFacebook className="text-2xl" /></a>
                <a href="#"><FaLinkedin className="text-2xl" /></a>
              </div>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Los Angeles, CA</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaMobileAlt />
                  <p>+254713616289</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 text-gray-400 text-center py-4">
        <p>© 2025 Weight Cheque. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;