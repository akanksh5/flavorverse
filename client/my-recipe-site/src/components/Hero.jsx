import React, { useState } from "react";
import "../styles/global.css";

const Hero = () => {
  const [recipe, setRecipe] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInstructions = async () => {
    if (!recipe.trim()) return;
    setLoading(true);
    setError("");
    setInstructions([]);

    try {
      const res = await fetch(`http://localhost:8000/get-instructions?recipe=${encodeURIComponent(recipe)}`, {
        method: "GET",
      });
      console.log(recipe)

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      setInstructions(data.instructions);
    } catch (err) {
      console.error(err);
      setError("Could not fetch instructions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-90"></div>
      <div className="relative z-10 w-full max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Discover <span className="text-red-500">Delicious Recipes</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 opacity-80 text-white">
          Your gateway to futuristic and mouth-watering dishes.
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
          <input 
            type="text" 
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            placeholder="Search recipes..." 
            className="w-full sm:w-80 px-4 py-3 bg-gray-700 text-white placeholder-gray-300 border border-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none shadow-lg"
          />
          <button 
            onClick={fetchInstructions}
            className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-gray-300 mt-4">Fetching instructions...</p>}
        {error && <p className="text-red-400 mt-4">{error}</p>}

        {instructions.length > 0 && (
          <div className="text-left text-white mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-center text-indigo-400">
              🍳 Step-by-Step Instructions
            </h3>
            <ol className="space-y-4">
              {instructions.map((step, index) => (
                <li
                  key={index}
                  className="bg-gray-700/60 backdrop-blur-lg p-4 rounded-xl shadow-md flex items-start gap-3 border border-indigo-500/30"
                >
                  <div className="text-indigo-400 font-bold text-lg w-6">{index + 1}.</div>
                  <div className="text-gray-100">{step.replace(/\*\*/g, "")}</div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
