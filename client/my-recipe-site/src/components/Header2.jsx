import React, { useEffect, useState } from "react";
import "../styles/global.css";

const Header = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUsername(data.name);
        } else {
          console.warn("Not logged in or failed to fetch user");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        setUsername("");
        window.location.href = "/"; // ✅ Redirect to homepage
      } else {
        console.warn("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex items-center">
        
        {/* Logo / Site Name */}
        <a href="/" className="text-2xl font-bold text-white">
          Flavor<span className="text-red-500">Verse</span>
        </a>

        {/* User Info and Logout */}
        {username && (
          <div className="ml-auto flex items-center gap-4">
            <span className="text-white text-lg">
              <span className="text-red-400 font-semibold">{username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
