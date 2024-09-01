'use client'
import React, {useState, useEffect} from 'react'
import axios from "axios";
import CyberpunkDonationCard from './BlinkCard';
import Cookies from "js-cookie"
interface bounties{
  availableAmount: number,
  team_user: "Miama" | "NYC",
  userId: number,
  id: string
}
export const runtime = "edge"

function BlinkCardCollection({isLogged, setIsLogged} : {isLogged: any, setIsLogged: any}) {
  const [bets, setBets] =  useState<null| bounties[]>(null);

  const cookie = Cookies.get('token')

  useEffect(() => {
    (async ()=> {
      const response = await axios.get(`${window.location.origin}/api/getBlinks`, {
        withCredentials: true
      })
      
      console.log(response.data)
      setBets(response.data.blinks)
    })()
  }, [cookie])
    
  return (
    <div className="container mx-auto p-4 w-full">
      <h1>NOTE! THIS IS JUST A PREVIEW, CLICK ON THE CARD TO SHOW THE PREVIEW ON DIALECT</h1>
      {
        isLogged ?
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10%]">
          {bets?.map((bet, index) => (
            <CyberpunkDonationCard bet={bet}/>
          ))}
        </div>
        : 
        <div className="flex w-full justify-center">
          <h1 className="text-2xl" >Please Login before seeing all the active bets!!</h1>
        </div>
      }
  </div>
  )
}

export default BlinkCardCollection