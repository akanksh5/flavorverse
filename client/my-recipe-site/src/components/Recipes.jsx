import React from "react";
import "../styles/global.css";

const RecipesList = () => {
  // Placeholder recipes
  const recipes = [
    { name: "Tomato Rice", description: "A spicy South Indian delicacy with tomatoes and aromatic spices." },
    { name: "Paneer Butter Masala", description: "Creamy, rich, and packed with flavors of butter and paneer." },
    { name: "Masala Dosa", description: "Crispy dosa with spicy potato filling served with chutney and sambar." },
    { name: "Chicken Biryani", description: "Fragrant basmati rice cooked with marinated chicken and exotic spices." },
    { name: "Chole Bhature", description: "Spicy chickpeas paired with fluffy deep-fried bread." }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
        Popular <span className="text-red-500">Recipes</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {recipes.map((recipe, idx) => (
          <div 
            key={idx}
            className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transform transition duration-300 border border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-2">{recipe.name}</h3>
            <p className="text-gray-400">{recipe.description}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition shadow-md">
              View Recipe
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipesList;
