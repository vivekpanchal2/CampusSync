import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import ClubSection from "../components/HomePage/ClubSection";
import EventSection from "../components/HomePage/EventSection";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="scroll-container snap-y snap-mandatory h-screen overflow-y-scroll">
        <HeroSection />

        <ClubSection />

        <EventSection />

        <section className="h-screen snap-always snap-start bg-gray-800 text-gray-200 flex flex-col justify-center items-center">
          <h2 className="text-5xl font-extrabold mb-8 text-teal-400">
            How CampusSync Works
          </h2>
          <div className="space-y-8 max-w-2xl">
            {[
              "Sign Up or Log In with your university credentials to access all features.",
              "Explore societies and find those that resonate with your interests and passions.",
              "Join societies and actively participate in their events and initiatives.",
              "Stay updated with notifications and announcements tailored just for you.",
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-teal-400">
                  {index + 1}
                </span>
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
