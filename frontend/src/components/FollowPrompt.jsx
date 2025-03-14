import React, { useState } from 'react'
import kitty from "../../public/kitty.jpg"

const FollowPrompt = ({user , index}) => {
    const [ifFollowed , setIfFollowed] = useState(false)



  return (
    <div key={index} className="flex w-full justify-between py-[0.4rem]">
                  <div className="flex">
                    <img
                      src={user?.profilePicture}
                      alt="User Image"
                      className="w-[3rem] h-[3rem] rounded-full"
                    ></img>
                    <div className="flex flex-col pl-[1rem] justify-center">
                      <p className="text-gray-800 font-semibold">
                        @{user?.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center pl-[5rem]">
                    <button onClick={() => setIfFollowed(!ifFollowed)} className="text-blue-500">{
                        ifFollowed ? "Followed" : "Follow"
                     }</button>
                  </div>
                </div>
  )
}

export default FollowPrompt