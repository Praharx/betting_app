'use client'
import React from 'react'
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios"
import {useRouter} from "next/navigation"
import { useWalletModal, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export const runtime = "edge"

function Navbar() {
  const router = useRouter()
  const {connect, publicKey, signMessage} = useWallet();
  const { setVisible: setModalVisible } = useWalletModal();

  async function signAndSend(route: string) {
    try {
      const message = new TextEncoder().encode(
        `You're a verified exceliWorker`
      );
      const signature = await signMessage?.(message);
      console.log(signature);

      const response = await axios.post(
        `${window.location.origin}/api/${route}`,
        {
          signature,
          pubKey: publicKey?.toString(),
        }
      );

      if (!response.data.success) {
        alert("Invalid user creds");
      
        return;
      }
      alert(route == "signin" ? "Signed in successfully" : "Signed up successfully");
    } catch (err) {
      alert("Unable to verify User");
      return;
    }
  }
  return (
    <div
        className="bg-[#1D2B39] h-[6vh] w-full flex justify-between p-6 pt-10"
    >
        <div className="flex gap-6 w-[60%] items-center ">
            <h1
                className=" w-[15%] font-extrabold text-xl"
            >
                Fade Me
            </h1>
            <input className="w-[40%] bg-[#1D2B39] border-[1px] p-2 rounded-md " placeholder='Search Bets' type="search" />
        </div>
        <div 
            className="gap-4 flex justify-evenly items-center"
        >
        <button 
        onClick={() => {
          if(!publicKey) {
            alert("No Wallet connected")
            return
          }
          signAndSend("signin");
        }}
      className="
        bg-[#1D2B39] 
        hover:bg-blue-400 
        text-blue-500 
        font-bold 
        py-2 
        px-4 
        rounded
        transition-colors 
        duration-300 
        ease-in-out
      "
        
    >
      Log in
    </button>
    <button 
     onClick={() => {
      if(!publicKey) {
        alert("No Wallet connected")
        return
      }
      signAndSend("signup");
    }}
      className="
        bg-blue-500 
        text-white
        font-bold 
        py-2 
        px-4 
        rounded
      "
    >
      Sign up
    </button>
    <WalletMultiButton
      style={{
        backgroundColor: "#3B82F6"
      }}
    />
            
        </div>
    </div>
  )
}

export default Navbar