import React from "react";
import "../styles/global.css";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-90"></div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Discover <span className="text-red-500">Delicious Recipes</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 opacity-80">
          Your gateway to futuristic and mouth-watering dishes.
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex items-center justify-center">
        <input 
            type="text" 
            placeholder="Search recipes..." 
            className="w-80 px-4 py-3 bg-gray-700 text-white placeholder-gray-300 border border-gray-500 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:outline-none shadow-lg"
        />
        <button className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-r-lg shadow-lg transition">
            Search
        </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
