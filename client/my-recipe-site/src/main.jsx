import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Import the main App component
import "./styles/global.css";  // Ensure Tailwind CSS is loaded

// Find the root div in index.html
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside #root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
