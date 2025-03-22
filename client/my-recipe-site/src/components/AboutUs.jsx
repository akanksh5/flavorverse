import React from "react";
import "../styles/global.css";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          About <span className="text-red-500">FlavorVerse</span>
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Welcome to <span className="text-red-400 font-semibold">FlavorVerse</span>, where every recipe is a gateway to a new culinary adventure. We're on a mission to bring diverse, delicious, and easy-to-make dishes right to your kitchen.
        </p>

        <p className="text-gray-400 mb-4">
          Born out of love for food and storytelling, FlavorVerse is more than just a recipe platform — it's a community of food enthusiasts, home cooks, and flavor explorers. Whether you're a seasoned chef or just starting out, our recipes are designed to be approachable and inspiring.
        </p>

        <p className="text-gray-400 mb-4">
          We blend traditional techniques with modern simplicity, focusing on global cuisines with a special love for Indian flavors. Our goal is to help you make food that's not only tasty but also tells a story.
        </p>

        <p className="text-gray-500 italic text-sm text-center mt-6">
        Built with care by the FlavorVerse team. Let's cook something amazing.
        </p>


      </div>
    </div>
  );
};

export default AboutUs;
