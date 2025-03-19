import React, { useEffect, useRef, useState } from "react";
import { getPostsForFeedAPI } from "../services/apis";
import { getRequestAxios } from "../services/requests";
import FeedPosts from "../components/FeedPosts";
import { useNavigate } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  const effectRan = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (effectRan.current) return;
    (async () => {
      try {
        const response = await getRequestAxios(getPostsForFeedAPI);
        if (response.data.success) {
          console.log("feed response -> ", response.data);
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    effectRan.current = true;
  }, []);

  return (
    <div className="flex">
      <div className="grid grid-cols-3 gap-1 w-full">
        {posts.map((post, index) => (
          <div
            className="w-full  object-cover rounded-lg shadow-md relative"
            key={index}
          >
            <img
              onClick={() => {
                navigate(`/user/${post?.author.username}`);
              }}
              className="w-full h-[40vh] cursor-pointer transition-all duration-200 hover:brightness-75"
              src={post.media}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
