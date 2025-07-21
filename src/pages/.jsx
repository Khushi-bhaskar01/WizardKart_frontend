import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">🧙‍♂️ 404</h1>
      <p className="text-lg md:text-xl mb-6">
        This magical page doesn’t exist in our realm.
      </p>
      <Link
        to="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
