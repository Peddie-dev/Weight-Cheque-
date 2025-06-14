import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PaymentPage from "./Pages/PaymentPage";
import AboutUs from "./Pages/AboutUs";
import RecipesPage from "./Pages/Recipes";
import ArticlesPage from "./Pages/Articles";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./Context/CartContext"; // Import CartProvider
import ArticlePage from "./Pages/ArticlePage";
import DigitalLibrary from "./Pages/DigitalLibrary";


const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar />
        <Routes>
          {/* Route for Home */}
          <Route path="/" element={<Home />} />

          {/*Route for About Us Page*/}
          <Route path="/about" element={<AboutUs />} />

          {/* Route for Payment Page */}
          <Route path="/payment" element={<PaymentPage />} />

          {/*Route for Recipes Page*/}
          <Route path="/recipes" element={<RecipesPage />} />

          {/*Route for Articles Page*/}
          <Route path="/articles" element={<ArticlesPage />} />

           <Route path="/articles/:slug" element={<ArticlePage />} /> 

           <Route path="/digital-library" element={<DigitalLibrary />} />
           
          {/*Route for Cart Page*/}
          <Route path="/Cart" element={<CartPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;