import React, { useState } from "react";
import "../styles/global.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder logic (you can connect to an API or backend here)
    if (name && email && message) {
      setStatus("Thank you for reaching out. We'll get back to you soon!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Please fill in all the fields.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Contact <span className="text-red-500">FlavorVerse</span>
        </h2>

        {status && <p className="text-red-400 text-center mb-4">{status}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="text-gray-300 block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="text-gray-300 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="text-gray-300 block mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
