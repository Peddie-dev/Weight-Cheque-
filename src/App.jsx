import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Recipes from './Components/Recipes/Recipes';
import AOS from "aos";
import "aos/dist/aos.css";
import CookBooks from './Components/CookBooks/CookBooks';
import Banner from './Components/Banner/Banner';
import Subscribe from './Components/Subscribe/Subscribe';
import Footer from './Components/Footer/Footer';

const App = () => {

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay:100,
    });
    AOS.refresh();
  }, []);
  
  return (
  <div className="bg-white dark:bg-gray-900
  dark:text-white duration-200">
    <Navbar/> 
    <Hero /> 
    <Recipes />
    <CookBooks />
    <Banner />
    <Subscribe />
    <Footer />
   </div>
  );
  
};

export default App
