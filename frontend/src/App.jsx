import React from "react"
import { APP_NAME } from "./assets/constants.js"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import LoginSignup from "./pages/LoginSignup.jsx"
import { RecoilRoot } from "recoil"

function App() {
  return (
    <RecoilRoot>
      <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<LoginSignup />}></Route>
      </Routes>
      
    </div>
    </RecoilRoot>
    
  )
}

export default App