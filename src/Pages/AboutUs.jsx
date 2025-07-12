import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-10">
          Learn more about who we are and what we do.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Weight Cheque, our mission is to build healthy nutrition habits by providing practical and
              affordable weight loss meal plans that suit your lifestyle and budget.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our vision is to be a global leader in healthy diets & nutrition, setting the benchmark
              for quality, affordability, and customer satisfaction.
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We are a group of dedicated professionals who are passionate about what we do.
              Each team member brings unique expertise to drive our mission forward.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions? We'd love to hear from you! Reach out to us at{" "}
              <a
                href="mailto:edpromerchants254@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                edpromerchants254@gmail.com
              </a>{" "}
              or call us at{" "}
              <a href="tel:+254713616289" className="text-blue-600 dark:text-blue-400 hover:underline">
                +254713616289
              </a>.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-10">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Weight Cheque. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;