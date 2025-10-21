import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Password Manager</h1>
      <p className="text-gray-700 mb-6 text-center">
        Securely store and manage all your passwords in one place.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
