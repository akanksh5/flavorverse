// AppLayout.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Header2 from "./Header2";

const AppLayout = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setUsername(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUsername(null);
      } finally {
        setLoading(false);
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
        setUsername(null);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) return null; // or a spinner

  return (
    <>
      {username ? (
        <Header username={username} onLogout={handleLogout} />
      ) : (
        <Header2 />
      )}
      <main className="pt-20">{children}</main>
    </>
  );
};

export default AppLayout;
