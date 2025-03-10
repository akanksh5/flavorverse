import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrendingRecipes from "./components/TrendingRecipes";
import Footer from "./components/Footer";
import "./styles/global.css";  // Make sure the path is correct


const App = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <Hero />
      <TrendingRecipes />
      <Footer />
    </div>
  );
};

export default App;
