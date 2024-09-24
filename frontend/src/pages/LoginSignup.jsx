import React, { useState } from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useRecoilState } from 'recoil';
import { AccountPresentAtom } from '../Store/AccountPresentAtom';
import insta from "/insta.png"

const LoginSignup = () => {
  const [isAccountPresent,SetAccountPresent] = useRecoilState(AccountPresentAtom);

  const signUpHandler = () => {
    SetAccountPresent(false);
  }

  const loginHandler= () => {
    SetAccountPresent(true);
  }

  return (
    <div className='w-screen h-screen flex flex-row justify-center pt-[3rem]'>
      <div className='w-[25%] h-[50%]'>
        <img src={insta}></img>
      </div>
      <div className='flex flex-col'>
        {
          isAccountPresent==true ? (<Login />) : (<Signup />)
        }
        <div className='border-2 mt-[1rem] h-[5rem] flex justify-center items-center border-gray-300'>
          {isAccountPresent == true ? (
                <div>
                    Don't Have an Account ? <span onClick={signUpHandler} className='text-[#5046e5] underline hover:font-medium hover:text-[#6366f1] cursor-pointer'>Sign Up</span>        
                </div>
          ) 
          : 
          (
                <div>
                  Have an Account ? <span onClick={loginHandler} className='text-[#5046e5] underline hover:font-medium hover:text-[#6366f1] cursor-pointer'>Log In</span>        
                </div>
          )}
        </div>
      </div>
      

    </div>
  )
}

export default LoginSignup