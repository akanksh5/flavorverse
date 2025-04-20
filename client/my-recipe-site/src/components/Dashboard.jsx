import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/me", {
          method: "GET",
          credentials: "include", // ⬅️ Required for sending cookies
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Hi{ name ? `, ${name}` : "!" }
        </h2>
        <p className="text-gray-400">Welcome to your FlavorVerse dashboard 🍽️</p>
      </div>
    </div>
  );
};

export default Dashboard;
