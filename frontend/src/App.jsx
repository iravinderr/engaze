import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home"; // Your main Home page with all three sections

function App() {
  return (
    <RecoilRoot>
      <div className="h-screen w-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route path="/home/*" element={<Home />} />
        </Routes>
        <Toaster />
      </div>
    </RecoilRoot>
  );
}

export default App;
