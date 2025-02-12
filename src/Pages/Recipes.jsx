import React from "react";
import Img1 from "../assets/Cookbook/Img1.png";
import Img2 from "../assets/Cookbook/Img2.png";
import Img3 from "../assets/Cookbook/Img3.png";
import { FaStar } from "react-icons/fa";

const CookBooksData = [
  {
    id: 1,
    img: Img1,
    title: "Mediterranean Guide Book",
    description:
      "The guidebook comes with all the resources you need to be successful on the Mediterranean diet, including a 30-day meal plan, shopping list, FAQ section, and recipes for the whole family.",
  },
  {
    id: 2,
    img: Img2,
    title: "Keto Made Easy",
    description:
      "Everything can be made keto! No more missing out on your favorite dishes. Keto Made Easy shows you how to re-create non-keto recipes in easy, cost-effective, and delicious ways.",
  },
  {
    id: 3,
    img: Img3,
    title: "DASH Made Easy",
    description:
      "Get the best we have to offer when it comes to the DASH Diet for your weight loss journey.",
  },
];

const RecipesPage = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-sm text-primary">Instant Download</p>
        <h1 className="text-3xl font-bold">Our Cookbooks</h1>
        <p className="text-gray-500 text-sm">
          Cutting out sugar is not easy. Those carb cravings can make a person crazy, which is why our guides can help—so you can treat without the cheat.
        </p>
      </div>

      {/* Cookbooks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {CookBooksData.map((book) => (
          <div
            key={book.id}
            className="rounded-xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white shadow-lg duration-300 group max-w-sm overflow-hidden"
          >
            {/* Image Section */}
            <div className="h-[150px] flex justify-center items-center bg-gray-200">
              <img
                src={book.img}
                alt={book.title}
                className="max-w-[120px] transform transition-transform group-hover:scale-105 duration-300 drop-shadow-md"
              />
            </div>

            {/* Details Section */}
            <div className="p-5 text-center">
              {/* Star Rating */}
              <div className="flex justify-center gap-1 text-yellow-500 mb-2">
                {[...Array(4)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-500 text-sm group-hover:text-white duration-300">
                {book.description}
              </p>
              <button className="bg-primary text-white py-2 px-5 rounded-full mt-4 transition-transform transform hover:scale-105 group-hover:bg-white group-hover:text-primary">
                Download Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;