'use client'

import Navbar from "@/components/Navbar";
import SemiNavbar from "@/components/SemiNavbar"
import BetCardSection from "@/components/betCardSection";
import CyberpunkDonationCard from "@/components/BlinkCard";
import BlinkCardCollection from "@/components/BlinkCardCollection";
import {useState} from "react"
export const runtime = "edge"

export default function Home() {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-[#1D2B39]">
      <Navbar setIsLogged={setIsLogged} />
      <SemiNavbar />
      <BetCardSection setIsLogged={setIsLogged} isLogged={isLogged} />
      <BlinkCardCollection isLogged={isLogged} setIsLogged={setIsLogged}   />
    </div>
  );
}
