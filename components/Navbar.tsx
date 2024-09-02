"use client";
import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Cookies from "js-cookie";

export const runtime = "edge";

function Navbar() {
  const router = useRouter();
  const { connect, publicKey, signMessage } = useWallet();

  return (
    <div className="bg-[#1D2B39] h-[6vh] w-full flex justify-between p-6 pt-10">
      <div className="flex gap-6 w-[60%] items-center ">
        <h1 className=" w-[15%] font-extrabold text-xl">Fade Me</h1>
        <input
          className="w-[40%] bg-[#1D2B39] border-[1px] p-2 rounded-md "
          placeholder="Search Bets"
          type="search"
        />
      </div>
      <div className="gap-4 flex justify-evenly items-center">
        <WalletMultiButton
          style={{
            backgroundColor: "#3B82F6",
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
