import React, { useEffect, useState,useMemo } from "react";
import Post from "./Post";
import { getRequestAxios, postRequestAxios } from "../services/requests";
import { connectWalletAPI, createPostAPI, getPostsForHomeAPI } from "../services/apis";
import { toast } from "react-hot-toast";
import SkeletonLoader from "./SkeletonLoader";

import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

const Middle = () => {

    const { publicKey , connected } = useWallet();

  useEffect(() => {
    if (publicKey) {
      (async () => {
        try {
          const response = await postRequestAxios(connectWalletAPI,{walletAddress : publicKey.toBase58()})
          if(response.data.success){
            toast.success("Wallet Registered with us")
          }
        } catch (error) {
          toast.error("Unable to Register Wallet")
          console.error(error)
        }
      })()
        
    }
  },[publicKey,connected]);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    tags: [],
    captions: "",
    file: null,
  });
  const [tagInput, setTagInput] = useState("");


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
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
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }

    setFormData({
      tags: [],
      captions: "",
      file: null,
    });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getRequestAxios(`${getPostsForHomeAPI}`, null);
        setPosts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="md:w-[57vw]">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    );
  }

  return (
    
            
            <div className="flex flex-col items-center ">

            
      <div className="bg-white flex justify-between items-center w-[95vw] md:w-[56.5vw] h-[4rem] shadow-md fixed rounded-xl">
        <div className="ml-[1rem]">
        <WalletMultiButton /> 

        </div >
        <button onClick={() => setShowForm(true)} className="bg-[#6366f1] w-[10rem] h-[2.5rem] mr-[1rem] text-white rounded-md hover:bg-[#4f52db]">
          Add New Post +
        </button>
      </div>
     
      <div className="flex flex-col items-center posts w-[95vw] md:w-[56.5vw] mt-[2rem] pt-[15vh]">
        {posts.length > 0 ? posts.map((post) => (
          <Post key={post._id} postData={post} />
        )) : (
          <div className="w-full h-full flex justify-center items-center text-4xl font-semibold">
            Follow Someone to see their posts. Random Feed Adding Soon ...
          </div>
        )}
      </div>

      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-5 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl pb-4">Add a New Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="text-lg">Captions: </label>
                <textarea
                  name="captions"
                  value={formData.captions}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="text-lg">Tags: </label>
                <div className="w-full p-2 border rounded flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-red-500">&times;</button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInput}
                    placeholder="Press Enter to add tag"
                    className="outline-none flex-grow"
                  />
                </div>
              </div>
              <div className="mb-3 flex flex-col relative">
                <label>Upload Image: </label>
                
                <label
                  htmlFor="filePicker"
                  className="bg-red-400 px-[1.3rem] py-[0.4rem] rounded-lg my-[0.4rem] cursor-pointer hover:text-white transition"
                >
                  {formData.file ? formData.file.name : "No File Selected"}
                </label>
                <input
                  id="filePicker"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                ></input>
                <p
                onClick={() => {formData.file ? setFormData({...formData,file:null}) : toast.error("No File Selected")}} 
                className="z-100 absolute top-[2.34rem] right-[1rem] font-bold cursor-pointer hover:text-white">X</p>
              </div>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">Submit</button>
            </form>
            <button onClick={() => setShowForm(false)} className="mt-3 bg-red-500 text-white py-2 px-4 rounded w-full">Cancel</button>
          </div>
        </div>
      )}
    </div>       
    
  );
};

export default Middle;
