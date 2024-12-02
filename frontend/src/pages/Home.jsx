import React from "react";
import Middle from "../components/Middle";
import Activity from "../components/Activity";
import "../styles/ContentSection.css";

const Home = () => {
  return (
    <div className="grid-container h-full w-full">
      <div className="grid-item grid-content">
        <div className="content-section">
          <div className="middle-section">
            <Middle />
          </div>
          <div className="activity-section">
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
