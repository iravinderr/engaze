import React, { useState } from "react";
import { APP_NAME } from "../assets/constants";
import { RiHomeLine } from "react-icons/ri";
import { IoPeopleSharp, IoSettingsOutline } from "react-icons/io5";
import "../styles/SideBar.css";
import { IoIosSearch } from "react-icons/io";
import useAuthNavigation from "../hooks/AuthNavigation";
import { NavLink } from "react-router-dom";
import { postRequestAxios } from "../services/requests";
import { logoutAPI } from "../services/apis";
import toast from "react-hot-toast";

const SideBar = () => {
    const { authenticated, setAuthenticated } = useAuthNavigation();
    const [Search, setSearch] = useState("");
    
    function updateHandler(event) {
        setSearch(event.target.value);
        console.log(Search);
    }

    const handleLogout = async () => {
        try {
          const response = await postRequestAxios(logoutAPI);
          if (response.data.success) {
            setAuthenticated(false);
            toast.success(response.data.message);
            localStorage.removeItem("accessToken");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };

    const navItems = [
        {
            name: "Home",
            icon: <RiHomeLine className="text-gray-300 cursor-pointer" />,
            path: "/home",
        },
        {
            name: "Feed",
            icon: <RiHomeLine className="text-gray-300 cursor-pointer" />,
            path: "/feed",
        },
        {
            name: "Friends",
            icon: <IoPeopleSharp className="text-gray-300 cursor-pointer" />,
            path: "/friends",
        },
        {
            name: "Settings",
            icon: <IoSettingsOutline className="text-gray-300 cursor-pointer" />,
            path: "/Settings",
        },
    ];

  return (
    <div className="cover flex flex-col pl-[1rem] sidebar-fixed">
      <div className="py-[2vw] flex items-center">
        <img src="../../public/App_Logo.png" className="w-[3vw] " />
        <div className="text-2xl text-white  font-medium">{APP_NAME}</div>
      </div>

      <div className="search-bar flex items-center justify-center h-[2.2rem] rounded-2xl mr-[1rem]">
        <IoIosSearch className="search-icon" />
        <input
          className="Sidebar-input placeholder-gray-200"
          type="text"
          placeholder="Search"
          value={Search}
          onChange={updateHandler}
        />
      </div>

      <ul className="flex flex-col mt-[3rem]">
        {navItems.map((item) => {
          <li key={item.name}>
            <NavLink className={({isActive}) => `flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem] ${isActive ? `bg-[#555]` : ``} hover:bg-[#555] rounded-md`} to={item.path}>{item.name}</NavLink>
          </li>
        })}
      </ul>
      
      <div className="flex flex-col mt-[3rem]">
        <div className="flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem] ">
          <RiHomeLine className="text-gray-300 cursor-pointer" />
          <p className="pl-[0.5rem] cursor-pointer">Home</p>
        </div>
        <div className="flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem] ">
          <RiHomeLine className="text-gray-300 cursor-pointer" />
          <p className="pl-[0.5rem] cursor-pointer">Feed</p>
        </div>
        <div className="flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem]">
          <IoPeopleSharp className="text-gray-300 cursor-pointer" />
          <p className="pl-[0.5rem] cursor-pointer">Friends</p>
        </div>
        <div className="flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem]">
          <IoSettingsOutline className="text-gray-300 cursor-pointer" />
          <p className="pl-[0.5rem] cursor-pointer">Settings</p>
        </div>
        <div onClick={handleLogout} className="flex text-white items-center text-xl pl-[0.7rem] pb-[1.4rem]">
          <IoSettingsOutline className="text-gray-300 cursor-pointer" />
          <p className="pl-[0.5rem] cursor-pointer">Logout</p>
        </div>
      </div>


    </div>
  );
};

export default SideBar;
