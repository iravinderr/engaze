import React, { useState } from 'react'
import { APP_NAME } from '../assets/constants'
import "../styles/SideBar.css"
import { IoIosSearch } from "react-icons/io";

const SideBar = () => {
    const [Search,setSearch] = useState('');
    function updateHandler(event){
        setSearch(event.target.value)
        console.log(Search);
    }
  return (
    <div className='cover flex flex-col pl-[1rem]'>
        <div className='text-2xl text-white py-[2rem] font-semibold'>{APP_NAME}</div>
        <div className='search-bar flex items-center justify-center h-[2.2rem] rounded-2xl mr-[1rem]'>
            <IoIosSearch className='search-icon'/>
            <input
            className='Sidebar-input '
            type='text'
            placeholder='Search'
            value={Search}
            onChange={updateHandler}
            />
        </div>
        <div className='flex flex-col'>

        </div>
    </div>
  )
}

export default SideBar