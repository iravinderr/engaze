import React, { useEffect, useState } from "react";
import { getRequestAxios } from "../services/requests";
import {
  fetchRandomUserDetailsAPI,
  getProfileDetailsAPI,
} from "../services/apis";
import FollowPrompt from "./FollowPrompt";

const Activity = () => {
  const [userData, setUserData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getRequestAxios(getProfileDetailsAPI);
        console.log("response -> ", response);
        if (response.data.success) {
          setUserData(response.data.data);
        }
      } catch (error) {
        // console.error("Error Fetching User Data ", error);
      }
    })();

    (async () => {
      try {
        const response = await getRequestAxios(fetchRandomUserDetailsAPI);
        if (response.data.success) {
          setSuggestions(response.data.data);
        }
      } catch (error) {
        // console.error("Error Fetching Random Suggestions :", error);
      }
    })();
  }, []);

  return (
    <div className="fixed h-screen pr-[1rem] pl-[2rem] pt-[1rem] ">
      <div className="flex flex-col ">
        <div className="flex">
          <img
            src={userData?.profilePicture}
            alt="User Image"
            className="w-[3.5rem] h-[3.5rem] rounded-full"
          ></img>
          <div className="flex flex-col pl-[1rem]">
            <p className="text-gray-800">@{userData?.username}</p>
            <p className="text-md font-semibold">{userData?.name}</p>
          </div>
        </div>
        <div className="py-[1.5rem]">
          <p className="font-semibold text-gray-600">Suggested For You</p>
        </div>
        <div>
          {suggestions.length > 0 &&
            suggestions.map((user, index) => {
              return (
                <FollowPrompt key={index} user={user}/>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Activity;
