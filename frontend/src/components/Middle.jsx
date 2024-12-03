import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { getRequestAxios, postRequestAxios } from "../services/requests";
import { createPostAPI, getPostsForHomeAPI } from "../services/apis";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import { rawPostData } from '../assets/rawdata';

const Middle = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    tags: "",
    captions: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await postRequestAxios(
        createPostAPI,
        formData,
        null,
        undefined,
        "multipart/form-data"
      );

      if (response.data.success) {
        setLoading(false);
        setShowForm(false);
        toast.success(response.data.message);
        navigate("/profile");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }

    setFormData({
      tags: "",
      captions: "",
      file: [],
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getRequestAxios(
          `${getPostsForHomeAPI}`,
          null
        );
        console.log(response.data.message);
        setPosts(response.data.data);
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
      }
    })();

  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white flex justify-end items-center w-[56.5vw] h-[4rem] shadow-md fixed">
        <button
          onClick={() => setShowForm(true)}
          className=" bg-[#6366f1] w-[10rem] h-[2.5rem] mr-[1rem] text-white rounded-3xl hover:bg-[#4f52db]"
        >
           Add New Post +
        </button>
      </div>

      <div className="posts w-[56.5vw] mt-[2rem] pt-[8vh]">
        {posts.map((post) => (
          <Post postData={post} />
        ))}
      </div>

      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 className="text-2xl pb-[1rem]">Add a New Post</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label className="text-lg">captions : </label>
                <textarea
                  name="captions"
                  value={formData.captions}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px" }}
                ></textarea>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label className="text-lg">Tags(comma-seperated) : </label>
                <input
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleInputChange}
                  required
                  style={{ width: "100%", padding: "8px" }}
                ></input>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Upload Image: </label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#5046e5",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setShowForm(false)}
              style={{
                marginTop: "10px",
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Middle;
