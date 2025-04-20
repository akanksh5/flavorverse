import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setName(data.name);
        } else {
          console.error("Unauthorized or failed to fetch user info");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  const fetchInstructions = async () => {
    if (!recipe.trim()) return;
    setLoading(true);
    setError("");
    setInstructions([]);

    try {
      const response = await axios.get("http://localhost:8000/get-instructions", {
        params: { recipe },
      });
      setInstructions(response.data.instructions);
    } catch (err) {
      setError("Could not fetch instructions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Hi{name ? `, ${name}` : "!"}
        </h2>
        <p className="text-gray-400 mb-6">Welcome to your FlavorVerse dashboard 🍽️</p>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            placeholder="Enter recipe name..."
            className="flex-grow p-2 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={fetchInstructions}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-gray-400">Fetching instructions...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {instructions.length > 0 && (
          <div className="text-left text-white mt-6">
            <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
            <ul className="list-disc list-inside space-y-1">
            {instructions.map((step, index) => (
              <li key={index}>{step.replace(/\*\*/g, "")}</li>
            ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
