import React, { useEffect, useState } from "react";
import { Post } from "../components";
import { getRequestAxios, putRequestAxios } from "../services/requests";
import { getOwnPostsAPI, getProfileDetailsAPI, updateProfileDetailsAPI } from "../services/apis";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { username } = useParams(); // Fetch username from URL
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, SetisEditing] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userResponse = await getRequestAxios(getProfileDetailsAPI);
        setUserData(userResponse.data.data);

        const postsResponse = await getRequestAxios(getOwnPostsAPI);
        console.log(postsResponse.data.data);
        setUserPosts(postsResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, [username]);

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      console.log(image)
      formData.append("file",image);

      const response = await putRequestAxios(updateProfileDetailsAPI,formData,null,null,"multipart/form-data");
      if(response.data.success){
        toast.success("Profile Updated Successfully");
        setUserData((prev) => ({
          ...prev,
          profilePicture: URL.createObjectURL(image), // Update UI optimistically
        }));
        setImage(null);
        SetisEditing(false);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(error)
    }
  }

  return (
    <div className="user-profile-container flex flex-col items-center">
      <div className="user-details-container flex-col md:flex-row md: justify-between items-center w-[80vw] p-[2rem] shadow-md rounded-lg mb-[2rem]">
        <div className="flex w-full">
          <div className="profile-image-container">
            <img
              src={userData?.profilePicture}
              alt="Profile"
              className="user-profile-image rounded-full border-2 border-gray-300"
            />
          </div>

          <div
            className={`user-info ${
              !isEditing ? "justify-center" : ""
            } flex flex-col gap-2 pt-[2rem] md:pt-0 items-center md:items-start`}
          >
            <h1 className="text-2xl font-bold">{userData?.name}</h1>
            <p className="text-gray-500">@{userData?.username}</p>
            {isEditing && (
              <div className="flex">
                <label
                  htmlFor="filePicker"
                  className="bg-red-400 px-[1.3rem] py-[0.4rem] rounded-lg my-[0.4rem] cursor-pointer hover:text-white transition"
                >
                  {image ? image.name : "Select an Image"}
                </label>
                <input
                  id="filePicker"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                ></input>
                {image && (
                  <button
                    className="bg-gray-300 px-[0.4rem] my-[0.4rem] ml-[0.6rem] rounded-lg"
                    onClick={() => setImage(null)}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-[12vw]">
          <button
            className={`${
              isEditing ? "bg-red-500" : "bg-[#6366f1]"
            }  text-white hover:bg-opacity-90 py-[0.3rem] px-[1.5rem] rounded-lg`}
            onClick={
              isEditing
                ? () => {
                    setImage(null);
                    SetisEditing(!isEditing);
                  }
                : () => {
                    SetisEditing(!isEditing);
                  }
            }
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing ? (
            image ? (
              <button
                onClick={() => handleImageUpload()}
                className={`bg-green-600 text-white hover:bg-opacity-90 py-[0.3rem] px-[1.93rem] mt-[0.3rem] rounded-lg`}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => toast.error("No Image Selected")}
                className={`bg-green-600 text-white cursor-not-allowed hover:bg-opacity-90 py-[0.3rem] px-[1.93rem] mt-[0.3rem] rounded-lg`}
              >
                Save
              </button>
            )
          ) : null}
        </div>
      </div>

      <div className="user-posts-container w-[80vw]">
        <h2 className="text-xl font-semibold mb-[1.5rem]">
          {userData?.name}'s Posts
        </h2>
        <div className="posts-grid grid grid-cols-2 gap-4">
          {userPosts?.map((post) => (
            <Post postData={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
