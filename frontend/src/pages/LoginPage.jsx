import React, { useState } from 'react'
import Login from '../components/Login';

import insta from "/insta.png"
import { Link } from 'react-router-dom';


const LoginPage = () => {
   

   

  return (
    <div className='w-screen h-screen flex flex-row justify-center pt-[3rem]'>
      <div className='w-[25%] h-[50%]'>
        <img src={insta}></img>
      </div>
      <div className='flex flex-col'>
        
        <Login />
        
        <div className='border-2 mt-[1rem] h-[5rem] flex justify-center items-center border-gray-300'>
                <Link to="/signup">
                Don't Have an Account ? <span  className='text-[#5046e5] underline hover:font-medium hover:text-[#6366f1] cursor-pointer'>Sign Up</span>        
                
                </Link>
                   
        </div>
      </div>
      

    </div>
  )
}

export default LoginPage