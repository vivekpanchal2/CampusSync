import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import ClubSection from "../components/HomePage/ClubSection";
import EventSection from "../components/HomePage/EventSection";
import CampusFeedSection from "../components/HomePage/CampusFeedSection";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="scroll-container snap-y snap-mandatory h-screen overflow-y-scroll">
        <HeroSection />

        <ClubSection />

        <EventSection />

        <CampusFeedSection />
      </div>
    </>
  );
};

export default HomePage;
