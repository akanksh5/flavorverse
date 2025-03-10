import React, { useState } from "react";
import "../styles/global.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Site Name */}
        <a href="/" className="text-2xl font-bold text-white">
            Recipe<span className="text-red-500">Hub</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-300 hover:text-red-400 transition">Home</a>
          <a href="/recipes" className="text-gray-300 hover:text-red-400 transition">Recipes</a>
          <a href="/about" className="text-gray-300 hover:text-red-400 transition">About</a>
          <a href="/contact" className="text-gray-300 hover:text-red-400 transition">Contact</a>
        </nav>

        {/* Login & Register Buttons */}
        <div className="hidden md:flex space-x-4">
          <a href="/login" className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-lg transition">
            Login
          </a>
          <a href="/register" className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition">
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-6">
          <a href="/" className="block text-gray-300 hover:text-red-400 py-2">Home</a>
          <a href="/recipes" className="block text-gray-300 hover:text-red-400 py-2">Recipes</a>
          <a href="/about" className="block text-gray-300 hover:text-red-400 py-2">About</a>
          <a href="/contact" className="block text-gray-300 hover:text-red-400 py-2">Contact</a>
          <div className="mt-4 flex flex-col space-y-2">
            <a href="/login" className="block text-center px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600">
              Login
            </a>
            <a href="/register" className="block text-center px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
