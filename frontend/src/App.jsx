import React from "react"
import { APP_NAME } from "./assets/constants.js"

function App() {
  return (
    <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
      <h1 className="text-9xl">{APP_NAME}</h1>
    </div>
  )
}

export default App