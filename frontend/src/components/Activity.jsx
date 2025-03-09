import React from 'react'
import kitty from "../../public/kitty.jpg"

const Activity = () => {
  return (
    <div className='fixed h-screen pr-[1rem] pl-[2rem] pt-[1rem]'>
      <div className='flex flex-col '>
          <div className='flex'>
              <img src={kitty} alt='User Image' className='w-[3rem] rounded-full'></img>
              <div className='flex flex-col pl-[1rem]'>
                  <p>Username</p>
                  <p>Profile Name</p>
              </div>
              
          </div>
          <div className='py-[1.5rem]'>
            <p className='font-semibold text-gray-600'>Suggested For You</p> 
          </div>
          <div>

          </div>
      </div>
    </div>
  )
}

export default Activity