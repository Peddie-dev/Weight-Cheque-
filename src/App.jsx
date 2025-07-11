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
import ArticlePage from "./Pages/ArticlePage";
import DigitalLibrary from "./Pages/DigitalLibrary";
import { CartProvider } from "./Context/CartContext";
import CartSidebar from "./Components/CartSidebar"; // Import sidebar here

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
    <CartProvider>
      <Router>
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
          <Navbar />

          {/* ✅ Sidebar globally accessible */}
          <CartSidebar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
            <Route path="/digital-library" element={<DigitalLibrary />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;