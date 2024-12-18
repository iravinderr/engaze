import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { deleteRequestAxios, getRequestAxios, postRequestAxios } from "../services/requests";
import { checkIfLikedAPI, likePostAPI, unlikePostAPI } from "../services/apis";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Post = ({ postData }) => {
  const [ifLiked, setIfLiked] = useState(false);
  const [totalLikes , setTotalLikes] = useState(0)
  const navigate = useNavigate();

  const likeHandler = async () => {
    if(ifLiked){
        try {
            const likeResponse = await deleteRequestAxios(unlikePostAPI,{postId:postData._id})
          
            if(likeResponse.data.success){
                toast.success("Post Unliked Successfully")
                setTotalLikes(totalLikes-1)
                setIfLiked(false)
            }
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
           
    }else{
      try {
        const likeResponse = await postRequestAxios(likePostAPI,{postId:postData._id})
        
        if(likeResponse.data.success){
            toast.success("Post Liked Successfully")
            setTotalLikes(totalLikes+1)
            setIfLiked(true)
        }
    } catch (error) {
        
        toast.error(error.response.data.message)
    }
    }
    
  }

  useEffect(() => {
    (async () => {
      try {
        const checkLikeResponse = await getRequestAxios(checkIfLikedAPI,{postId:postData._id})
        setTotalLikes(checkLikeResponse.data.data.length)
        
        if(checkLikeResponse){
          setIfLiked(true);
        }
      } catch (error) {
        

      }
    })()
  },[])
  
  return (
    <div className=" rounded-2xl shadow-lg border-2 border-gray-200 mb-[1rem]">
      <div className="User-Detail flex py-[0.8rem] pl-[1.5rem]">
        <div onClick={() => navigate(`/user/${postData.author.username}`)} className="profile-image-contain">
          <img
            src={postData.author.profileImage}
            alt="User-image"
            className="profile-image"
          />
        </div>

        <div className="flex flex-col ml-[1rem]">
          <p className="font-semibold">{postData.author.name}</p>
          <p className="text-gray-500">{postData.author.username}</p>
        </div>
      </div>
      
      

      <hr></hr>
      <div className="Post-info flex flex-col gap-2 items-start px-[1.5rem] py-[0.8rem] text-gray-500">

        <p>{postData.captions}</p>

        {postData.media ? (
          <div className="post-container rounded-xl my-[0.8rem] ">
            <img
              src={postData.media}
              className="post-image"
              alt="** media files **"
            />
          </div>
        ) : null}

        <div className="flex justify-start">
          <button onClick={likeHandler}>
            {ifLiked ? (
              <FaHeart className="text-xl hover:text-red-400 text-red-500" />
            ) : (
              <FaRegHeart className="text-xl hover:text-red-400 text-red-500" />
            )}
          </button>
          <p className="ml-[0.5rem] text-md font-semibold ">
            {totalLikes > 0 ? totalLikes : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
