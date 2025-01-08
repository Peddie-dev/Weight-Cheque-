import React from 'react';
import Img1 from "../../assets/mediterranean/Img1.png";
import Img2 from "../../assets/mediterranean/Img2.png";
import Img3 from "../../assets/mediterranean/Img3.png";
import Img4 from "../../assets/mediterranean/Img4.png";
import Img5 from "../../assets/mediterranean/Img5.png";
import { TfiAlarmClock } from "react-icons/tfi";

const RecipesData = [
  {
    id: 1,
    img: Img1,
    title: "Top Rated Easy, Healthy Mediterranean Recipes",
    Duration: "30 Minutes",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "11 Flavorful, Healthy Mediterranean Recipes to Make for Dinner",
    Duration: "25 Minutes",
    Color: "Red",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "15 Healthy Mediterranean Recipes for Easy Dinners",
    Duration: "45 Minutes",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Healthy Mediterranean Recipes: Simple, Nutritious and Delicious Recipes for Everyday Meals",
    Duration: "40 Minutes",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img5,
    title: "Go Mediterranean With 25 Healthy Recipes That Will Make You Live Forever",
    Duration: "60 Minutes",
    aosDelay: "800",
  },
];

const Recipes = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">

        {/* Header Section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Top Recipes for You</p>
          <h1 className="text-3xl font-bold">Recipes</h1>
          <p className="text-xs text-gray-400">Start your healthy journey here! We have delicious recipes, guides for eating out</p>
        </div>

        {/* Body Section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {/* Card Section */}
            {RecipesData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="transition-all transform hover:scale-105 space-y-3 hover:shadow-lg rounded-lg overflow-hidden bg-white"
              >
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{data.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500 mt-2">
                    <TfiAlarmClock className="text-yellow-400" />
                    <span>{data.Duration}</span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* More Recipes Button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-2 px-8 rounded-md shadow-md hover:bg-secondary transition-colors">
              More Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
