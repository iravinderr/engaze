import React, { useState } from 'react'
import "../styles/post.css"
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import kitty from "../../public/kitty.jpg"

const Post = () => {

    const [postLike,setPostLike] = useState(false)
    function likeHandler() {
        setPostLike(!postLike)
    }
  return (
    <div className=' rounded-2xl shadow-lg border-2 border-gray-200 mb-[1rem]'>
        <div className='User-Detail flex py-[0.8rem] pl-[1.5rem]'>
            <div  className='profile-image-container'>
            <img src={kitty} alt='User-image' className='profile-image' />
            </div>
           
            <div className='flex flex-col ml-[1rem]'>
                <p className='font-semibold'>User.name</p>
                <p className='text-gray-500'>User.info</p>
            </div>
        </div>
        <hr></hr>
        <div className='Post-info flex flex-col items-start px-[1.5rem] py-[0.8rem] text-gray-500'>
            <p>Image Caption It will be a very long text regarding the image</p>
            <div className='post-container rounded-xl mb-[0.8rem] mt-[0.8rem]'>
                <img src="../../public/kitty.jpg" className=' post-image' alt='These are all the posts User has sent' />

            </div>
            <div className='flex justify-start'>
            <button onClick={likeHandler}>
                {
                postLike ? (<BiSolidLike className='text-xl hover:text-black'/>) : (<BiLike className='text-xl hover:text-black'/>)
                }
                </button>
                <p className='ml-[1rem] text-lg font-semibold'>
                    {
                        postLike ? ("Liked") : ("Like")
                    }
                    </p>

            </div>
            
            
        </div>

    </div>
  )
}

export default Post