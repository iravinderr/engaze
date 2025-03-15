import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FollowPrompt = ({user , index}) => {
    const [ifFollowed , setIfFollowed] = useState(false)
    const navigate = useNavigate();


  return (
    <div key={index} className="flex w-full justify-between py-[0.4rem]">
                  <div className="flex">
                    <img
                      onClick={() => navigate(`/user/${user?.username}`)}
                      src={user?.profilePicture}
                      alt="User Image"
                      className="w-[3rem] h-[3rem] cursor-pointer rounded-full"
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