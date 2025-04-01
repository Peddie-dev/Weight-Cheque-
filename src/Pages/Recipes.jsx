import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import { FaStar } from "react-icons/fa";

const RecipesPage = () => {
  const [ebooks, setEbooks] = useState([]); // State to hold fetched ebooks
  const { cart, setCart } = useCart(); // Access cart context

  // Fetch ebooks from Strapi
  useEffect(() => {
    axios
      .get("https://your-strapi-url.com/api/ebooks?populate=*") // Replace with actual Strapi URL
      .then((response) => {
        setEbooks(response.data.data); // Store data in state
      })
      .catch((error) => {
        console.error("Error fetching ebooks:", error);
      });
  }, []);

  // Function to add items to cart
  const addToCart = (book) => {
    const existingItem = cart.find((item) => item.id === book.id);
    if (existingItem) {
      alert("Item already in cart!");
    } else {
      setCart([...cart, { id: book.id, name: book.attributes.title, price: book.attributes.price, quantity: 1 }]);
    }
  };

  return (
    <div className="container mx-auto px-6 py-14">
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-sm font-medium text-primary uppercase tracking-wide">
          Instant Download
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Our Cookbooks
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Cutting out sugar is not easy. Those carb cravings can make a person
          crazy, which is why our guides can help—so you can treat without the cheat.
        </p>
      </div>

      {/* Cookbooks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
        {ebooks.map((book) => (
          <div
            key={book.id}
            className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300 max-w-sm"
          >
            {/* Image Section */}
            <div className="h-[180px] flex justify-center items-center bg-gray-100 dark:bg-gray-700">
              <img
                src={book.attributes.image?.data?.attributes?.url || "default-image.png"}
                alt={book.attributes.title}
                className="w-28 transform transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
              />
            </div>

            {/* Details Section */}
            <div className="p-6 text-center">
              {/* Star Rating */}
              <div className="flex justify-center gap-1 text-yellow-500 mb-2">
                {[...Array(4)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {book.attributes.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {book.attributes.description}
              </p>
              <p className="text-lg font-bold text-primary mt-2">
                ${book.attributes.price}
              </p>
              <button
                onClick={() => addToCart(book)}
                className="bg-primary text-white py-2 px-6 rounded-full mt-5 transition-transform transform hover:scale-105 hover:bg-white hover:text-primary border border-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;

