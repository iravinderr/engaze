import React from "react";
import { RiHomeLine, RiUserLine, RiSettings5Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { postRequestAxios } from "../services/requests";
import toast from "react-hot-toast";
import useAuthNavigation from "../hooks/AuthNavigation";
import { logoutAPI } from "../services/apis";

const BottomNav = () => {

  const { setAuthenticated } = useAuthNavigation();


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
    { name: "Home", icon: <RiHomeLine />, path: "/home" },
    { name: "Feed", icon: <RiHomeLine />, path: "/feed" },
    { name: "Find", icon: <IoIosSearch/>, path: "/find" },
    { name: "Profile", icon: <RiUserLine />, path: "/profile" },
    { name: "Settings", icon: <RiSettings5Line />, path: "/settings" },
    
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#6366f1] flex justify-around py-3 shadow-lg">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-white ${
              isActive ? "text-yellow-400" : ""
            }`
          }
        >
          <div className="text-xl">{item.icon}</div>
          <p className="text-sm">{item.name}</p>
        </NavLink>
      ))}
      <li
          onClick={handleLogout}
          className="flex flex-col items-center text-white"
        >
          <TbLogout className="text-gray-300 cursor-pointer" />
          <p className="cursor-pointer">Logout</p>
        </li>

      
    </div>
  );
};

export default BottomNav;
