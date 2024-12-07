import React, { useEffect, useState } from "react";
import { Post } from "../components";
import { deleteRequestAxios, getRequestAxios, postRequestAxios } from "../services/requests";
import { checkIfFollowedAPI, fetchUserDetailsAPI, fetchUserPostsAPI, followUserAPI, unfollowUserAPI } from "../services/apis";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UserProfile = () => {
    const { username } = useParams(); // Fetch username from URL
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [ifFollowed,setIfFollowed] = useState(false)

    useEffect(() => {
        (async () => {
          try {
            const userResponse = await getRequestAxios(fetchUserDetailsAPI, {username});
            setUserData(userResponse.data.data);

            const postsResponse = await getRequestAxios(fetchUserPostsAPI,{username});
            console.log(postsResponse.data.data)
            setUserPosts(postsResponse.data.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        })();

        (async () => {
            try {
                const response = await getRequestAxios(checkIfFollowedAPI,{username})
                if(response.data.success){
                    setIfFollowed(true)
                }
            } catch (error) {
                setIfFollowed(false)
                console.error("User Might not be following", error);

            }
        })();
    
        
      }, [username]);

      const followHandler = async () => {
        if(ifFollowed){
            try {
                const followResponse = await deleteRequestAxios(`${unfollowUserAPI}?followeeId=${userData._id}`,)
                console.log(followResponse.data)
                if(followResponse.data.success){
                    toast.success("Account Unfollowed Successfully")
                    setIfFollowed(false)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
               
        }else{
            try {
                const followResponse = await postRequestAxios(followUserAPI,{followeeId:userData._id})
                console.log(followResponse.data)
                if(followResponse.data.success){
                    toast.success("Account Followed Successfully")
                    setIfFollowed(true)
                    
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
        
      }

  return (
    <div className="user-profile-container flex flex-col items-center">
      
      <div className="user-details-container flex justify-between items-center w-[80vw] p-[2rem] shadow-md rounded-lg mb-[2rem]">
        
        <div className="user-info flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{userData?.name}</h1>
          <p className="text-gray-500">@{userData?.username}</p>
          <button onClick={followHandler} className="w-[6rem] h-[2.5rem] border-2 hover:bg-gray-200" >
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

export default UserProfile;
