import React from "react";
import { APP_NAME } from "../services/constants";
import { Link } from "react-router-dom";
import insta from "/insta.png";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WalletLoginForm from "./WalletLoginForm";

const WalletLoginLayout = () => {
  return (
<div className="w-screen h-screen flex flex-row justify-center pt-[3rem]">
      <div className="hidden w-[25%] h-[50%] md:block">
        <img src={insta} />
      </div>

      <div className="flex flex-col">
        <div className="h-[46vh] w-[360px] border-2 border-gray-300 flex flex-col items-center mt-[1.2rem]">
          <div className="text-4xl font-semibold py-[2.5rem]">
            {APP_NAME}
          </div>

          <div className="py-[1rem]">
            <WalletMultiButton />
          </div>

          <WalletLoginForm />
        </div>

        <div className="border-2 mt-[1rem] h-[5rem] flex justify-center items-center border-gray-300">
          <Link to="/signup">
            Don't Have an Account?{" "}
            <span className="text-[#5046e5] underline hover:font-medium hover:text-[#6366f1] cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>  )
}

export default WalletLoginLayout