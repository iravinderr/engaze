import React, { useEffect, useState } from "react";
import Middle from "../components/Middle";
import Activity from "../components/Activity";
import "../styles/ContentSection.css";

const Home = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Set initial state and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid-container h-full w-full">
      <div className="grid-item grid-content">
        <div className="content-section">
          <div className="middle-section pl-[2.4vw] md:pl-[1.2vw]">
            <Middle isMobile={isMobile} />
          </div>
          {!isMobile && ( // Conditionally rendering the Activity Area
            <div className="activity-section">
              <Activity />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
