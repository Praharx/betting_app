import Image from "next/image";
import Navbar from "@/components/Navbar";
import SemiNavbar from "@/components/SemiNavbar"
import BetCardSection from "@/components/betCardSection";
import CyberpunkDonationCard from "@/components/BlinkCard";
import BlinkCardCollection from "@/components/BlinkCardCollection";

export const runtime = "edge"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1D2B39]">
      <Navbar/>
      <SemiNavbar />
      <BetCardSection />
      <BlinkCardCollection/>
    </div>
  );
}
