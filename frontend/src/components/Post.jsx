import "../styles/post.css";
import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

const Post = ({ postData }) => {
  const [postLike, setPostLike] = useState(false);

  function likeHandler() {
    setPostLike(!postLike);
  }

  return (
    <div className=" rounded-2xl shadow-lg border-2 border-gray-200 mb-[1rem]">
      <div className="User-Detail flex py-[0.8rem] pl-[1.5rem]">
        <div className="profile-image-contain">
          <img
            src={postData.profileImage}
            alt="User-image"
            className="profile-image"
          />
        </div>

        <div className="flex flex-col ml-[1rem]">
          <p className="font-semibold">{postData.name}</p>
          <p className="text-gray-500">{postData.username}</p>
        </div>
      </div>
      
      

      <hr></hr>
      <div className="Post-info flex flex-col gap-2 items-start px-[1.5rem] py-[0.8rem] text-gray-500">

        <p>{postData.captions}</p>

        {postData.media ? (
          <div className="post-container rounded-xl mb-[0.8rem] mt-[0.8rem]">
            <img
              src={postData.media}
              className="post-image"
              alt="** media files **"
            />
          </div>
        ) : null}

        <div className="flex justify-start">
          <button onClick={likeHandler}>
            {postLike ? (
              <BiSolidLike className="text-xl hover:text-black" />
            ) : (
              <BiLike className="text-xl hover:text-black" />
            )}
          </button>
          <p className="ml-[1rem] text-lg font-semibold">
            {postLike ? "Liked" : "Like"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
