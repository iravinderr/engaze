import React from 'react'
import Post from './Post'

const Middle = () => {
  return (
    <div className='flex flex-col'>
        <div className='bg-white flex justify-end items-center w-[56.5vw] h-[4rem] shadow-md fixed'>
            <button className=' bg-[#6366f1] w-[10rem] h-[2.5rem] mr-[1rem] text-white rounded-3xl hover:bg-[#4f52db]'>Add New Post +</button>
        </div>

        <div className='posts w-[56.5vw] mt-[2rem] pt-[8vh]'>
          <Post />
          <Post/>
          <Post />
          <Post />
          <Post />
          <Post />
          
        </div>
    </div>
  )
}

export default Middle