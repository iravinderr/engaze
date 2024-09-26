import React, { useState } from 'react'
import Loader from './Loader';
import { APP_NAME } from '../assets/constants'
import { postRequestAxios } from '../services/requests';
import { loginAPI } from '../services/apis';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    identifier: '',
    password: ''
  });
  const[Loading,setLoading] = useState(null)

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
    setLoading(true)
    try {
      const response = await postRequestAxios(loginAPI, inputData, null, null);

    if(response.data.success){
      setLoading(false)
      localStorage.setItem('accessToken',response.data.accessToken);
      navigate("/home")

    }
    } catch (error) {
      setLoading(false);
      toast.error("Ma chudaao")
    }
    
  };

  if(Loading){
    return <Loader />
  }

 
  return (
    <div className='h-[46vh] w-[360px] border-2 border-gray-300 flex flex-col items-center mt-[1.2rem]'>
      <div className='text-4xl font-semibold italic py-[2.5rem]'>
        {APP_NAME}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex bg-[#fafafa] justify-center-center border-2 h-[2.8rem] w-[17rem] mb-[0.3rem] border-gray-300 focus-within:border-gray-400'>
          
          <input
            type="text"
            name="identifier"
            value={inputData.identifier}
            onChange={handleInputChange}
            placeholder="Username or email"
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
        <button type="submit" className='bg-[#5046e5] py-[0.6rem] px-[6.5rem] rounded-2xl text-white font-semibold'>Log In</button>

        </div>
      </form>
    </div>
  )
}

export default Login