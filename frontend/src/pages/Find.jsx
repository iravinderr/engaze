import React, { useEffect, useState } from "react";

import { IoIosSearch } from "react-icons/io";
import useAuthNavigation from "../hooks/AuthNavigation";
import {  useNavigate } from "react-router-dom";
import { getRequestAxios } from "../services/requests";
import {  searchUserAPI } from "../services/apis";
import { Loader } from "../components";

const Find = () => {
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
      const response = await getRequestAxios(
        `${searchUserAPI}?username=${query}`
      );
      if (response.data.success) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
        setSearchResults([]);
      console.error("Search failed:", error);
    }
  };

    const handleUserClick = (username) => {
        setIsSearching(false);
        navigate(`/user/${username}`)
    }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(Search);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [Search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div >
        <div className="search-bar flex items-center justify-center h-[2.6rem] rounded-xl shadow-xl mx-[2.4vw] top-[1rem] absolute">
        <IoIosSearch className="text-white text-xl ml-[0.7rem] mr-[0.4rem]" />
        <input
          className="Sidebar-input-find placeholder-gray-200 rounded-xl text-lg"
          type="text"
          placeholder="Search"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {(isSearching && searchResults?.length > 0 ) ? (
          <div
            className="absolute top-[3rem] bg-white w-[90vw] max-h-[180px] overflow-y-auto rounded-md shadow-lg "
            style={{ padding: "10px" }}
          >
            {searchResults.map((user) => (
                <div className="flex flex-col">
              <div
                key={user._id}
                className="flex items-center gap-2 py-3 px-4 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => handleUserClick(user.username)}
              >

                <img
                  src={user.profilePicture ?? "/default-avatar.png"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <p>{user.name}</p>
              </div>
              <div>
                <hr></hr>
              </div>
              </div>
            ))}
          </div>
        ) : Search.length === 0 ? 
        <div className="absolute top-[3rem] flex justify-center items-center left-[0.2rem] bg-white w-[92.3vw] h-[100vh] text-xl font-semibold rounded-md shadow-lg "
        style={{ padding: "10px" }}>
                "Search Your Friends and Have Fun"
        </div> : 
        <div className="absolute top-[3rem] left-[0.2rem] bg-white  w-[90vw] max-h-[180px] text-lg overflow-y-auto rounded-md shadow-lg "
        style={{ padding: "10px" }}>
                No Users Found
        </div>}
        </div>
    </div>
  )
}

export default Find