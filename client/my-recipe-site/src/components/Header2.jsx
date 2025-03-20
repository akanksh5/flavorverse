import React from "react";
import "../styles/global.css";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Site Name */}
        <a href="/" className="text-2xl font-bold text-white">
          Flavor<span className="text-red-500">Verse</span>
        </a>
        
      </div>
    </header>
  );
};

export default Header;
