import React from "react";
import { LoaderProps } from "../Types/types";

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
        <p className="text-white text-lg font-semibold mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
