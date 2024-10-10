import React from 'react'
import Img1 from "../../assets/Cookbook/Img1.png";
import Img2 from "../../assets/Cookbook/Img2.png";
import Img3 from "../../assets/Cookbook/Img3.png";
import { FaStar } from 'react-icons/fa';

const CookBooksData = [
  {
    id: 1,
    img: Img1,
    title: "mediterranean Guide Book",
    description: "The guidebook will come complete with all the resources you need to be successful on the mediterranean diet, including a 30-day meal plan, shopping list, FAQ section and recipes that the entire family will love.",
  },
  {
    id: 2,
    img: Img2,
    title: "Keto made easy",
    description: "Everything can be made keto! No more missing out on your favorite dishes. Keto Made Easy, shows you how to re-create non-keto recipes in easy, cost-effective, and delicious ways.", 
  },
  {
    id: 3,
    img: Img3,
    title: "DASH made easy",
    description: "Get the best we have to offer when it comes to DASH Diet for your weight loss",
  },
]
const CookBooks = () => {
  return (
    <div>
      <div className="container">
      <div className="text-left mb-24">
            <p data-aos="fade-up" className="text-sm text-primary">Instant Download</p>
            <h1 data-aos="fade-up" className="text-3xl font-bold">Our Cookbooks</h1>
            <p data-aos="fade-up" className="text-xs text-gray-400">Cutting out sugar is not easy. 
            Those carb cravings can make a person crazy, which is why our guides can help.
            so you can treat without the cheat
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2
        md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {CookBooksData.map((data) => (
            <div className="rounded-2xt bg-white
             dark:bg-gray-800 hover:bg-black/80
              dark:hover:bg-primary hover:text-white
              relative shadow-xl duration-300 group max-w-[300px]"
            >
              <div className="h-[100px]">
                <img src={data.img} alt=""
                  
                  className="max-w-[140px] block mx-auto
                  transform -translate-y-20
                  group-hover:scale-105 duration-300
                  drop-shadow-md" 
                />
              </div>
              <div className="p-4 text-center">
                <div className="w-full flex items-center
                justify-center gap-1">
                  <FaStar className="text-yellow-500"/>
                  <FaStar className="text-yellow-500"/>
                  <FaStar className="text-yellow-500"/>
                  <FaStar className="text-yellow-500"/>
                </div>
                 <h1 className="text-xl font-bold">{data.title}

                 </h1>
                 <p className="text-gray-500
                 group-hover:text-white duration-300
                 text-sm line-clamp-2">{data.description}</p>
                 <button
                 className="bg-primary hover:scale-105
                 duration-300 text-white py-1 px-4
                 rounded-full mt-4 group-hover:bg-white
                 group-hover:text-primary"
                 >
                  Download Now
                 </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CookBooks
