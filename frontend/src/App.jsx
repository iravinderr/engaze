import React from "react";
import { BottomNav, SideBar } from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthNavigation from "./hooks/AuthNavigation";

function App() {
  const { authenticated } = useAuthNavigation();

  return (
      <div className="h-screen w-screen flex">
        <div className="hidden w-[17vw] md:block">{!authenticated ? null : <SideBar />}</div>
        <div><Outlet /></div>
        <Toaster />
        <div className="md:hidden">{!authenticated ? null : <BottomNav />}</div>
      </div>
  );
}

export default App;
