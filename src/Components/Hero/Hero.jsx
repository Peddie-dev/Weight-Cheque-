import React from 'react';
import Image1 from '../../assets/hero/food.png';
import Image2 from '../../assets/hero/healthy.png';
import Image3 from '../../assets/hero/Salmon.png';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Lifestyle Change at the Palm of your Hands",
    description: "What can you eat? Which ingredients should always be on your...",
  },
  {
    id: 2,
    img: Image2,
    title: "Check your Lifestyle with Weight Cheque",
    description: "You have everything you need to make a lasting lifestyle change.",
  },
  {
    id: 3,
    img: Image3,
    title:"Ultimate Diets & Recipes",
    description: "We have delicious recipes, keto, mediterranean guides for eating out",
  },
];

const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200">

      {/* Hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-800 dark:text-white">
                    {data.title}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                    {data.description}
                  </p>
                  <div>
                    <Link to="/payment">
                      <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-3 px-6 rounded-full shadow-md transform transition-transform">
                        Purchase Today
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Image section */}
                <div className="order-1 sm:order-2 flex justify-center sm:justify-end">
                  <div className="relative z-10">
                    <img
                      src={data.img}
                      alt=""
                      className="w-[280px] sm:w-[450px] lg:w-[500px] h-auto object-contain mx-auto sm:scale-110 lg:scale-100 transition-transform"
                    />
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;