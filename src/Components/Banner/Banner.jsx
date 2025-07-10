import React from 'react';
import BannerImg from "../../assets/Banner/Banner.png";
import { GrSecure } from 'react-icons/gr';
import { MdLibraryBooks } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="mt-4 min-h-[550px] flex justify-center items-center py-12 sm:py-0 bg-white dark:bg-gray-900">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image Section */}
          <div data-aos="zoom-in">
            <img 
              src={BannerImg} 
              alt="Digital Library Banner"
              className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-lg object-cover rounded-lg"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
              Subscribe Now for Full eBook Access
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-300 tracking-wide leading-5">
              Unlock access to all our premium eBooks in one digital library. Cook smarter and healthier — all from a single subscription.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <MdLibraryBooks className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white" />
                <p className="text-gray-700 dark:text-gray-300">All Our Premium eBooks in One Place</p>
              </div>
              <div className="flex items-center gap-4">
                <FiMonitor className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white" />
                <p className="text-gray-700 dark:text-gray-300">Access on Any Device</p>
              </div>
              <div className="flex items-center gap-4">
                <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white" />
                <p className="text-gray-700 dark:text-gray-300">Secure & Private Platform</p>
              </div>
            </div>

            {/* CTA Button with original gradient */}
            <div className="mt-6">
              <Link to="/subscribe">
                <button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white py-3 px-8 rounded-full text-lg hover:scale-105 transform duration-200">
                  Subscribe Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;


