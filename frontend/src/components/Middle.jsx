import React from 'react'
import Post from './Post'

const Middle = () => {
  return (
    <div className='flex flex-col'>
        <div className='bg-white flex justify-end items-center w-[54rem] h-[4rem] shadow-md'>
            <button className=' bg-[#6366f1] w-[10rem] h-[2.5rem] mr-[1rem] text-white rounded-3xl hover:bg-[#4f52db]'>Add New Post +</button>
        </div>

        <div className='posts w-[54rem] mt-[2rem] rounded-2xl shadow-lg border-2 border-gray-200'>
          <Post />
        </div>
    </div>
  )
}

export default Middle