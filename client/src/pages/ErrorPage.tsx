import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">500</h1>
        <h2 className="text-4xl font-semibold mt-4">Internal Server Error</h2>
        <p className="text-lg mt-2 text-gray-500">
          Oops! Something went wrong on our end. Please try again later.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition-colors duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
