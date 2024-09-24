import React from "react"
import { APP_NAME } from "./assets/constants.js"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      
    </div>
  )
}

export default App