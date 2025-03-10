import React from "react";
import "../styles/global.css";

const RecipeCard = ({ title, image, description, link }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
      <a href={link} className="mt-4 inline-block text-red-400 hover:text-red-500">
        View Recipe
      </a>
    </div>
  );
};

export default RecipeCard;
