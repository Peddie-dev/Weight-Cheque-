import React from "react";
import footerLogo from "../../assets/CHEQUE.png";
import Banner from "../../assets/footer-pattern.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

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
    <div style={BannerImg} className="text-white">
      <div className="container">
        <div className="grid md:grid-cols-3 py-8">
          {/* Company Details */}
          <div className="py-8 px-4">
            <h1
              className="sm:text-3xl text-xl font-bold sm:text-left 
                text-justify mb-3 flex items-center gap-3"
            >
              <img src={footerLogo} alt="" className="max-w-[50px]" />
              Weight Cheque
            </h1>
            <p>
              Our mission is to build healthy nutrition habits by providing
              practical and affordable weight loss meal plans that suit your
              lifestyle and budget.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1
                  className="sm:text-3xl text-xl 
                        font-bold sm:text-left text-justify mb-3"
                >
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer 
                                hover:text-primary
                                hover:translate-x-1 duration-300
                                text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Los Angeles, CA</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+254713616289</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-900 text-gray-400 text-center py-4">
        <p>© 2025 Weight Cheque. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;