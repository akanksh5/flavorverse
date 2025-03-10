import React from "react";
import RecipeCard from "./RecipeCard";
import "../styles/global.css";

const TrendingRecipes = () => {
  const recipes = [
    { title: "Crispy Dosa", image: "/images/dosa.jpg", description: "A South Indian classic, perfect for breakfast.", link: "/recipes/dosa" },
    { title: "Creamy Alfredo Pasta", image: "/images/pasta.jpg", description: "Rich, creamy, and absolutely delicious.", link: "/recipes/pasta" },
    { title: "Spicy Chicken Biryani", image: "/images/biryani.jpg", description: "Aromatic and flavorful rice dish.", link: "/recipes/biryani" }
  ];

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center text-red-400 mb-8">Trending Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
    </section>
  );
};

export default TrendingRecipes;
