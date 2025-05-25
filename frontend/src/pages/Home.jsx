import React, { useEffect, useMemo, useState } from "react";
import Middle from "../components/Middle";
import Activity from "../components/Activity";
import "../styles/ContentSection.css";

import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';


const Home = () => {

  
    const network = WalletAdapterNetwork.Devnet;
  
      const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
      const wallets = useMemo(
          () => [
              
               
              new UnsafeBurnerWalletAdapter(),
          ],
          [network]
      );
      

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Set initial state and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
    <div className="grid-container h-full w-full">
      <div className="grid-item grid-content">
        <div className="content-section">
          <div className="middle-section pl-[2.4vw] md:pl-[1.2vw]">
            <Middle isMobile={isMobile} />
          </div>
          {!isMobile && ( // Conditionally rendering the Activity Area
            <div className="activity-section">
              <Activity />
            </div>
          )}

        </div>
      </div>
    </div>
    </WalletModalProvider>
    </WalletProvider>
</ConnectionProvider>
  );
};

export default Home;
