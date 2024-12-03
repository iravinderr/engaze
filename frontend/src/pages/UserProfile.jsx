import React, { useEffect, useState } from "react";
import "../styles/userProfile.css";
import { Post } from "../components";
import { getRequestAxios } from "../services/requests";
import { fetchUserDetailsAPI, fetchUserPostsAPI } from "../services/apis";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { username } = useParams(); // Fetch username from URL
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [ifFollowed,setIfFollowed] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userResponse = await getRequestAxios(fetchUserDetailsAPI, {username});
            setUserData(userResponse.data.data);
            console.log("UserResponse ->",userResponse.data)
            const postsResponse = await getRequestAxios(fetchUserPostsAPI,{username});
            console.log("User Posts->",postsResponse)
            setUserPosts(postsResponse.data.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, [username]);

  return (
    <div className="user-profile-container flex flex-col items-center">
      
      <div className="user-details-container flex justify-between items-center w-[80vw] p-[2rem] shadow-md rounded-lg mb-[2rem]">
        
        <div className="user-info flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{userData?.name}</h1>
          <p className="text-gray-500">@{userData?.username}</p>
          <button className="w-[6rem] h-[2.5rem] border-2 hover:bg-gray-200" >
            {ifFollowed ? 'Followed' : 'Follow'}
          </button>
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
        <h2 className="text-xl font-semibold mb-[1rem]">User's Posts</h2>
        <div className="posts-grid grid grid-cols-2 gap-4">
          {userPosts?.map((post, index) => (
            <Post key={index} postData={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
