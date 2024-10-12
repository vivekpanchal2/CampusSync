import React from "react";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ClubPage from "./pages/ClubInfo";
import ClubForm from "./pages/CreateClub";
import Clubs from "./pages/Clubs";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/club/:id" element={<ClubPage />} />
        <Route path="/createClubs" element={<ClubForm />} />
        <Route path="/clubs" element={<Clubs />} />
      </Routes>
    </>
  );
};

export default App;
