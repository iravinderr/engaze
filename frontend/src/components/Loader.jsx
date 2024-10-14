import React from 'react'
import { ClipLoader } from 'react-spinners';


const Loader = () => {
  return (
    <div className="fixed h-full w-full flex justify-center items-center z-50">
        <ClipLoader size={150} color={"#123abc"} loading={true} />
    </div>
  )
}

export default Loader