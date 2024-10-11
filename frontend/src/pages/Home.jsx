import React from "react";
import SideBar from "../components/SideBar";
import ContentSection from "../components/ContentSection"; // New Component
import "../styles/Home.css";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <div className="grid-container h-full w-full">
      <SideBar className="grid-item sidebar-fixed" /> 
      <div className="grid-item grid-content">
        <Routes>
         
          <Route path="/main" element={<ContentSection />} />
          
        </Routes>
      </div>

    </div>
  );
};

export default Home;
