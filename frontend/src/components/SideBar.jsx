import React, { useEffect, useState } from "react";
import { APP_NAME } from "../services/constants";
import { RiHomeLine } from "react-icons/ri";
import { IoPeopleSharp, IoSettingsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import useAuthNavigation from "../hooks/AuthNavigation";
import { NavLink, useNavigate } from "react-router-dom";
import { getRequestAxios, postRequestAxios } from "../services/requests";
import { logoutAPI, searchUserAPI } from "../services/apis";
import toast from "react-hot-toast";
import "../styles/SideBar.css";
import Loader from "./Loader";
import being_social from "../../public/being_social.png"

const SideBar = () => {
  const { loading, setLoading, setAuthenticated } = useAuthNavigation();
  const [Search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate()

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await getRequestAxios(`${searchUserAPI}?username=${query}`);
      if (response.data.success) {
        
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleUserClick = (username) => {
    
    navigate(`user/${username}`);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await postRequestAxios(logoutAPI);
      if (response.data.success) {
        setLoading(false);
        setAuthenticated(false);
        toast.success(response.data.message);
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      setLoading(false);
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
      name: "My Profile",
      icon: <IoSettingsOutline className="text-gray-300 cursor-pointer" />,
      path: "/profile",
    }
    ,
    {
      name: "Settings",
      icon: <IoSettingsOutline className="text-gray-300 cursor-pointer" />,
      path: "/settings",
    },
    
  ];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(Search);
    }, 500); // Debounce search to avoid excessive API calls

    return () => clearTimeout(delayDebounce);
  }, [Search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="cover flex flex-col pl-[1rem] sidebar-fixed">
      <div className="py-[2vw] flex items-center gap-4">
        <img src={being_social} className="w-[3vw] " />
        <div className="text-2xl text-white  font-medium">{APP_NAME}</div>
      </div>

      <div className="search-bar flex items-center justify-center h-[2.2rem] rounded-2xl mr-[1rem]">
        <IoIosSearch className="search-icon" />
        <input
          className="Sidebar-input placeholder-gray-200"
          type="text"
          placeholder="Search"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}        />

          {isSearching && searchResults?.length > 0 && (
          <div
            className="absolute top-[10rem] left-[1.6rem] bg-white w-[80%] max-h-[180px] overflow-y-auto rounded-md shadow-lg z-100000"
            style={{ padding: "10px" }}
            
          >
            {searchResults.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => handleUserClick(user.username)}
              >
                <img
                  src={user.profileImage ?? "/default-avatar.png"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      <ul className="flex flex-col mt-[3rem] gap-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              className={({ isActive }) =>
                `flex gap-2 text-white items-center text-xl pl-[0.7rem] pb-[1.4rem] ${
                  isActive ? `bg-[#6366f1]` : ``
                } hover:bg-[#6366f1] rounded-md`
              }
              to={item.path}
            >
              {item.icon} {item.name}
            </NavLink>
          </li>
        ))}

        <li
          onClick={handleLogout}
          className="flex rounded-lg hover:bg-[#6366f1] text-white items-center text-xl pl-[0.7rem] pb-[1.4rem]"
        >
          <IoSettingsOutline className="text-gray-300 cursor-pointer" />
          <p className="pl-[0.5rem] cursor-pointer">Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
