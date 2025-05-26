import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postRequestAxios } from "../services/requests";
import { requestNonceAPI, verifyWalletSignatureAPI } from "../services/apis";
import useAuthNavigation from "../hooks/AuthNavigation";
import Loader from "./Loader";
import bs58 from "bs58"

const WalletLoginForm = () => {

    const { publicKey, signMessage, connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthenticated } = useAuthNavigation();

  const handleWalletLogin = async () => {
    try {
      if (!connected || !publicKey) {
        toast.error("Please connect your wallet.");
        return;
      }

      setLoading(true);

      const nonceRes = await postRequestAxios(requestNonceAPI, {
        walletAddress: publicKey.toBase58(),
      });

      const nonce = nonceRes.data.data;

      const encodedMessage = new TextEncoder().encode(nonce);
      const signature = await signMessage(encodedMessage);

      const verifyRes = await postRequestAxios(verifyWalletSignatureAPI, {
        walletAddress: publicKey.toBase58(),
        signedMessage: bs58.encode(signature),
      });

      if (verifyRes.data.success) {
        setAuthenticated(true);
        toast.success("Logged in with wallet");
        navigate("/home");
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || "Login failed";
  toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-4 items-center">
      <button
        onClick={handleWalletLogin}
        className="bg-[#16a34a] py-2 px-6 text-white rounded-xl font-semibold hover:bg-green-500"
      >
        Login with Wallet
      </button>
    </div>
  )
}

export default WalletLoginForm