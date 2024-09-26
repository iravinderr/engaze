import React from "react";
import { APP_NAME } from "./assets/constants.js";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <RecoilRoot>
      <div className="h-screen w-screen">
        <Routes>
          <Route path="/" element={<LoginSignup />}></Route>
        </Routes>
        <Toaster />
      </div>
    </RecoilRoot>
  );
}

export default App;
