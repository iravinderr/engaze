import React from "react";
import Middle from "./Middle";  
import Activity from "./Activity"; 
import "../styles/ContentSection.css"; 

const ContentSection = () => {
  return (
    <div className="content-section">
      <div className="middle-section">
        <Middle /> 
      </div>
      <div className="activity-section">
        <Activity /> 
      </div>
    </div>
  );
};

export default ContentSection;
