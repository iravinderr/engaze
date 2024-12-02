import React from "react";
import { SideBar } from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthNavigation from "./hooks/AuthNavigation";

function App() {
  const { authenticated } = useAuthNavigation();

  return (
      <div className="h-screen w-screen flex">
        <div className="w-[17vw]">{!authenticated ? null : <SideBar />}</div>
        <div><Outlet /></div>
        <Toaster />
      </div>
  );
}

export default App;
