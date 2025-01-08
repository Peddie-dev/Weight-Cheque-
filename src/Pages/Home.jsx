import React from "react";
import Hero from "../Components/Hero/Hero";
import Recipes from "../Components/Recipes/Recipe";
import CookBooks from "../Components/CookBooks/CookBooks";
import Banner from "../Components/Banner/Banner";
import Subscribe from "../Components/Subscribe/Subscribe";

const Home = () => {
  return (
    <div>
      <Hero />
      <Recipes />
      <CookBooks />
      <Banner />
      <Subscribe />
    </div>
  );
};

export default Home;