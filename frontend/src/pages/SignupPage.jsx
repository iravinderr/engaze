import React from 'react'

import { Signup } from '../components';

import insta from "/insta.png"
import { Link } from 'react-router-dom';

const SignupPage = () => {
 

  return (
    <div className='w-screen h-screen flex flex-row justify-center pt-[3rem]'>
      <div className='w-[25%] h-[50%]'>
        <img src={insta}></img>
      </div>
      <div className='flex flex-col'>
        
          <Signup />
        
        <div className='border-2 mt-[1rem] h-[5rem] flex justify-center items-center border-gray-300'>
                <Link to="/">
                    Have an Account ? <span  className='text-[#5046e5] underline hover:font-medium hover:text-[#6366f1] cursor-pointer'>Log In</span>        

                </Link>
                
        </div>
      </div>
      

    </div>
  )
}

export default SignupPage