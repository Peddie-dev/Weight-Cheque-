import React, { useState } from "react";
import Banner from "../../assets/Website/orange-pattern.png";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("https://your-strapi-url.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `abd35984acd2030a7d58b7eb15b8fdb8d79ca7eafe1449d35cd0f39eadb9525f46335ebbb6d578d3ab92b98bf9e1ed9ea42eb05e7a33be9d0a9729e105c73c3884bc1be0f771e0775186e2a9f4d037f0014737fb1a8077126d77a1f84490aafe971f4540b73b357e094c715bc49dae7acd7b14fcb6b4c810f837e82ef4918c93`,
        },
        body: JSON.stringify({
          data: {
            email: email,
            subscribedAt: new Date().toISOString(),
          },
        }),
      });

      if (response.ok) {
        setStatus("Thank you for subscribing!");
        setEmail(""); // Clear the input
      } else {
        setStatus("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("An error occurred. Try again later.");
    }
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800 text-white"
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold">
            Get Notified About New Articles and Recipes
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition duration-200"
            >
              Submit
            </button>
          </form>
          {status && <p className="text-sm text-white mt-2">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
