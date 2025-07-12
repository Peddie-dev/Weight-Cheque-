import React from 'react';
import BannerImg from "../../assets/Banner/Banner.png";
import { GrSecure } from 'react-icons/gr';
import { MdLibraryBooks } from 'react-icons/md';
import { FiMonitor } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          
          {/* Image Section */}
          <div data-aos="zoom-in" className="flex justify-center">
            <img 
              src={BannerImg} 
              alt="A preview of digital healthy diet eBooks" 
              className="max-w-[420px] w-full h-auto drop-shadow-lg object-cover rounded-2xl"
              loading="lazy"
            />
          </div>

          {/* Text + Pricing Section */}
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white leading-tight">
              Subscribe Now for Full eBook Access
            </h1>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Unlock access to all our premium eBooks in one digital library. Cook smarter and healthier — all from a single subscription.
            </p>

            {/* Benefits */}
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <MdLibraryBooks className="text-4xl p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-black dark:text-white" />
                <span className="text-gray-700 dark:text-gray-300">All Our Premium eBooks in One Place</span>
              </li>
              <li className="flex items-center gap-4">
                <FiMonitor className="text-4xl p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-black dark:text-white" />
                <span className="text-gray-700 dark:text-gray-300">Access on Any Device</span>
              </li>
              <li className="flex items-center gap-4">
                <GrSecure className="text-4xl p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-black dark:text-white" />
                <span className="text-gray-700 dark:text-gray-300">Secure & Private Platform</span>
              </li>
            </ul>

            {/* Pricing Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              
              {/* Monthly Plan */}
              <div className="border rounded-2xl p-6 text-center bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-black dark:text-white">Monthly Access</h3>
                <p className="text-3xl font-bold text-primary mt-2">
                  $8<span className="text-base font-medium">/month</span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  Billed monthly. Cancel anytime.
                </p>
                <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
                  + Exclusive eBook discounts
                </p>
                <Link to="/payment?plan=monthly">
                  <button className="mt-4 w-full bg-primary hover:bg-opacity-90 text-white py-2 rounded-full transition duration-200">
                    Choose Monthly
                  </button>
                </Link>
              </div>

              {/* Yearly Plan */}
              <div className="border-2 border-secondary rounded-2xl p-6 text-center bg-white dark:bg-gray-900 hover:shadow-lg transition relative">
                <div className="absolute top-0 right-0 bg-secondary text-white text-xs px-2 py-1 rounded-bl-lg font-semibold">
                  Best Value
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white">Yearly Access</h3>
                <p className="text-3xl font-bold text-secondary mt-2">
                  $80<span className="text-base font-medium">/year</span>
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  Save $16 by subscribing yearly.
                </p>
                <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium">
                  + Exclusive eBook discounts
                </p>
                <Link to="/payment?plan=yearly">
                  <button className="mt-4 w-full bg-secondary hover:bg-opacity-90 text-white py-2 rounded-full transition duration-200">
                    Choose Yearly
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;