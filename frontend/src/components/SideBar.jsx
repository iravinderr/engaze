import React, { useState } from 'react'
import { APP_NAME } from '../assets/constants'
import { RiHomeLine } from "react-icons/ri";
import { IoPeopleSharp,IoSettingsOutline } from "react-icons/io5";
import "../styles/SideBar.css"
import { IoIosSearch } from "react-icons/io";

const SideBar = () => {
    const [Search,setSearch] = useState('');
    function updateHandler(event){
        setSearch(event.target.value)
        console.log(Search);
    }
  return (
    <div className='cover flex flex-col pl-[1rem] sidebar-fixed'>
        <div className='py-[2vw] flex items-center'>
          <img src="../../public/App_Logo.png" className='w-[3vw] '/>
          <div className='text-2xl text-white  font-medium'>{APP_NAME}</div>

        </div>
        <div className='search-bar flex items-center justify-center h-[2.2rem] rounded-2xl mr-[1rem]'>
            <IoIosSearch className='search-icon'/>
            <input
            className='Sidebar-input placeholder-gray-200'
            type='text'
            placeholder='Search'
            value={Search}
            onChange={updateHandler}
            />
        </div>
        <div className='flex flex-col mt-[3rem]'>
            <div className='flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem] '>
                <RiHomeLine className='text-gray-300 cursor-pointer'/>
                <p className='pl-[0.5rem] cursor-pointer'>Home</p>
            </div>
            <div className='flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem] '>
                <RiHomeLine className='text-gray-300 cursor-pointer'/>
                <p className='pl-[0.5rem] cursor-pointer'>Feed</p>
            </div>
            <div className='flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem]'>
                <IoPeopleSharp className='text-gray-300 cursor-pointer'/>
                <p className='pl-[0.5rem] cursor-pointer'>Friends</p>
            </div>
            <div className='flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem]'>
                <IoSettingsOutline className='text-gray-300 cursor-pointer'/>
                <p className='pl-[0.5rem] cursor-pointer'>Settings</p>
            </div>
        </div>
    </div>
  )
}

export default SideBar