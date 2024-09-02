'use client'

import Navbar from "@/components/Navbar";
import SemiNavbar from "@/components/SemiNavbar"
import BetCardSection from "@/components/betCardSection";
import CyberpunkDonationCard from "@/components/BlinkCard";
import BlinkCardCollection from "@/components/BlinkCardCollection";
import {useState} from "react"
export const runtime = "edge"

export default function Home() {
  const [blinkCreated, setBlinkCreate] = useState(0)
  return (
    <div className="min-h-screen bg-[#1D2B39]">
      <Navbar  />
      <SemiNavbar />
      <BetCardSection setBlinkCreate={setBlinkCreate} />
      <BlinkCardCollection blinkCreated={blinkCreated} />
    </div>
  );
}
