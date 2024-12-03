import React, { useEffect, useState } from "react";
import "../styles/userProfile.css";
import { Post } from "../components";
import {  getRequestAxios} from "../services/requests";
import {  getOwnPostsAPI, getProfileDetailsAPI} from "../services/apis";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
    const { username } = useParams(); // Fetch username from URL
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            const userResponse = await getRequestAxios(getProfileDetailsAPI);
            setUserData(userResponse.data.data);

            const postsResponse = await getRequestAxios(getOwnPostsAPI);
            console.log(postsResponse.data.data)
            setUserPosts(postsResponse.data.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        })();

    
        
      }, [username]);

      
      

  return (
    <div className="user-profile-container flex flex-col items-center">
      
      <div className="user-details-container flex justify-between items-center w-[80vw] p-[2rem] shadow-md rounded-lg mb-[2rem]">
        
        <div className="user-info flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{userData?.name}</h1>
          <p className="text-gray-500">@{userData?.username}</p>
          
        </div>

        
        <div className="profile-image-container">
          <img
            src={userData?.profileImage}
            alt="Profile"
            className="user-profile-image rounded-full border-2 border-gray-300"
          />
        </div>
      </div>

    
      <div className="user-posts-container w-[80vw]">
        <h2 className="text-xl font-semibold mb-[1.5rem]">{userData?.name}'s Posts</h2>
        <div className="posts-grid grid grid-cols-2 gap-4">
          {userPosts?.map((post) => (
            <Post  postData={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
