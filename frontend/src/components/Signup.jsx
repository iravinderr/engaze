import React, { useState } from 'react'
import { APP_NAME } from '../assets/constants'
import { postRequestAxios } from '../services/requests';
import { signupAPI } from '../services/apis';
import { useRecoilState } from 'recoil';
import { AccountPresentAtom } from '../Store/AccountPresentAtom';
import toast from "react-hot-toast"


const Signup = () => {
  const [isAccountPresent,SetAccountPresent] = useRecoilState(AccountPresentAtom);

  const [inputData, setInputData] = useState({
    name: '',
    username:'',
    email:'',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the specific field in the state object
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form actions like sending to API
    try {
      const response = await postRequestAxios(signupAPI, inputData, null, null);

      if (response.data.success) {
        toast.success(response.data.message);
        SetAccountPresent(!isAccountPresent);
      }
    } catch (error) {
      toast.error(error.response.data.message);

    }
  };

  return (
    <div className='h-[60vh] w-[360px] border-2 border-gray-300 flex flex-col items-center mt-[1.2rem]'>
      <div className='text-4xl font-semibold italic py-[2.5rem]'>
        {APP_NAME}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex bg-[#fafafa] justify-center-center border-2 h-[2.8rem] w-[17rem] mb-[0.3rem] border-gray-300 focus-within:border-gray-400'>
          
          <input
            type="text"
            name="name"
            value={inputData.identifier}
            onChange={handleInputChange}
            placeholder="Full Name"
            className='text-sm bg-[#fafafa] pl-[0.8rem] w-[17rem] focus:outline-none focus:border-gray-400'
          >
          </input>
        </div>
        <div className='flex bg-[#fafafa] justify-center-center border-2 h-[2.8rem] w-[17rem] mb-[0.3rem] border-gray-300 focus-within:border-gray-400'>
          
          <input
            type="text"
            name="username"
            value={inputData.identifier}
            onChange={handleInputChange}
            placeholder="Username"
            className='text-sm bg-[#fafafa] pl-[0.8rem] w-[17rem] focus:outline-none focus:border-gray-400'
          >
          </input>
        </div>
        <div className='flex bg-[#fafafa] justify-center-center border-2 h-[2.8rem] w-[17rem] mb-[0.3rem] border-gray-300 focus-within:border-gray-400'>
          
          <input
            type="text"
            name="email"
            value={inputData.identifier}
            onChange={handleInputChange}
            placeholder="Email"
            className='text-sm bg-[#fafafa] pl-[0.8rem] w-[17rem] focus:outline-none focus:border-gray-400'
          >
          </input>
        </div>
        <div className='flex justify-center-center bg-[#fafafa] border-2  h-[2.8rem] w-[17rem] border-gray-300 focus-within:border-gray-400'>
          
          <input
            type={showPassword ? "text" : "password"}

            name="password"
            value={inputData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className='text-sm pl-[0.8rem] bg-[#fafafa] w-[14.3rem] focus:outline-none pr-[0.2xvrem]'
          >
           </input>
          
          {inputData.password && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="text-sm"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          )}

        </div>
        <div className='flex justify-center pt-[1rem] '>
        <button type="submit" className='bg-[#5046e5] py-[0.6rem] px-[6.5rem] rounded-2xl text-white font-semibold'>Sign Up</button>

        </div>
      </form>
    </div>
  )
}

export default Signup