import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletLoginLayout } from "../components";


const WalletLogin = () => {

    const network = WalletAdapterNetwork.Devnet;

    const wallets = [
      new PhantomWalletAdapter(),
      new TorusWalletAdapter(),
    ];
  return (
    
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <WalletLoginLayout />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
  )
}

export default WalletLogin