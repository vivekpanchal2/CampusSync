import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      <div className="relative text-center z-10">
        <h1 className="text-9xl font-bold text-cyan-400 tracking-wide animate-pulse shadow-lg">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-gray-400 text-lg">
          It might have been removed, or the link is broken.
        </p>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-stars opacity-20 pointer-events-none"></div>

      <Link
        to="/"
        className="mt-8 px-8 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 hover:from-blue-600 hover:to-cyan-500 z-10"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
