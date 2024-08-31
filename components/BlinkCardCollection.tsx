'use client'
import React, {useState, useEffect} from 'react'
import axios from "axios";
import CyberpunkDonationCard from './BlinkCard';
interface bounties{
  availableAmount: number,
  team_user: "Miama" | "NYC",
  userId: number,
  id: string
}
export const runtime = "edge"

function BlinkCardCollection() {
  const [bets, setBets] =  useState<null| bounties[]>(null);

  useEffect(() => {
    (async ()=> {
      const response = await axios.get(`${window.location.origin}/api/getBlinks`, {
        withCredentials: true
      })

      console.log(response.data)
      setBets(response.data.blinks)
    })()
  }, [])
    
  return (
    <div className="container mx-auto p-4 w-full">
    <h1>NOTE! THIS IS JUST A PREVIEW, CLICK ON THE CARD TO SHOW THE PREVIEW ON DIALECT</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10%]">
      {bets?.map((bet, index) => (
        <CyberpunkDonationCard bet={bet}/>
      ))}
    </div>
  </div>
  )
}

export default BlinkCardCollection