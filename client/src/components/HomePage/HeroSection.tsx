import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div>
      <section className="h-screen flex flex-col snap-always snap-start relative bg-[url('https://i.ibb.co/9vwqCHL/group.jpg')] bg-cover bg-center text-white  justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide">
            Welcome to{" "}
            <span className="text-teal-300  animate-pulse">CampusSync</span>
            <br />
            <span className="text-2xl md:text-4xl text-white font-semibold">
              A hub for{" "}
              <span className="text-teal-300">Silver Oak University</span>!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-yellow-300 mb-8 max-w-2xl leading-relaxed text-center">
            Your central hub to connect, explore, and participate in the vibrant
            societies at{" "}
            <span className="font-semibold">Silver Oak University</span>. Stay
            updated with the latest events and activities!
          </p>
          <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4">
            <button className="bg-teal-400 hover:bg-teal-600 text-black py-2 px-4 rounded-lg font-medium shadow-lg transition duration-300 mb-2 md:mb-0">
              <Link to="/clubs">Explore Societies</Link>
            </button>
            <button className="bg-transparent border-2 border-gray-100 hover:bg-gray-100 hover:text-black text-gray-100 py-2 px-4 rounded-lg font-medium shadow-lg transition duration-300">
              <Link to="/clubs">Upcoming Events</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
