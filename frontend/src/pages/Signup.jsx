import React, { useState } from "react";
import { postRequestAxios } from "../services/requests";
import { APP_NAME } from "../services/constants";
import { useNavigate } from "react-router-dom";
import { signupAPI } from "../services/apis";
import { Link } from "react-router-dom";
import { Loader } from "../components";
import insta from "/insta.png";

const Signup = () => {
  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postRequestAxios(signupAPI, inputData, null, null);

      if (response.data.success) {
        setLoading(false);
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  if (Loading) {
    return <Loader />;
  }

  return (
    <div className="w-screen h-screen flex flex-row justify-center pt-[3rem]">
      <div className="w-[25%] h-[50%]">
        <img src={insta}></img>
      </div>
      <div className="flex flex-col">
        <div className="h-[60vh] w-[360px] border-2 border-gray-300 flex flex-col items-center mt-[1.2rem]">
          <div className="text-4xl font-semibold italic py-[2.5rem]">
            {APP_NAME}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex bg-[#fafafa] justify-center-center border-2 h-[2.8rem] w-[17rem] mb-[0.3rem] border-gray-300 focus-within:border-gray-400">
              <input
                type="text"
                name="name"
                value={inputData.identifier}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="text-sm bg-[#fafafa] pl-[0.8rem] w-[17rem] focus:outline-none focus:border-gray-400"
              ></input>
            </div>
            <div className="flex bg-[#fafafa] justify-center-center border-2 h-[2.8rem] w-[17rem] mb-[0.3rem] border-gray-300 focus-within:border-gray-400">
              <input
                type="text"
                name="username"
                value={inputData.identifier}
                onChange={handleInputChange}
                placeholder="Username"
                className="text-sm bg-[#fafafa] pl-[0.8rem] w-[17rem] focus:outline-none focus:border-gray-400"
              ></input>
            </div>
            <div className="flex bg-[#fafafa] justify-center-center border-2 h-[2.8rem] w-[17rem] mb-[0.3rem] border-gray-300 focus-within:border-gray-400">
              <input
                type="text"
                name="email"
                value={inputData.identifier}
                onChange={handleInputChange}
                placeholder="Email"
                className="text-sm bg-[#fafafa] pl-[0.8rem] w-[17rem] focus:outline-none focus:border-gray-400"
              ></input>
            </div>
            <div className="flex justify-center-center bg-[#fafafa] border-2  h-[2.8rem] w-[17rem] border-gray-300 focus-within:border-gray-400">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="text-sm pl-[0.8rem] bg-[#fafafa] w-[14.3rem] focus:outline-none pr-[0.2xvrem]"
              ></input>

              {inputData.password && (
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>
            <div className="flex justify-center pt-[1rem] ">
              <button
                type="submit"
                className="bg-[#5046e5] py-[0.6rem] px-[6.5rem] rounded-2xl text-white font-semibold"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="border-2 mt-[1rem] h-[5rem] flex justify-center items-center border-gray-300">
          <Link to="/">
            Have an Account ?{" "}
            <span className="text-[#5046e5] underline hover:font-medium hover:text-[#6366f1] cursor-pointer">
              Log In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
