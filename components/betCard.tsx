'use client'

import React, { useState } from 'react';
import axios from "axios"
import Modal from './animata/overlay/modal';

interface BetCardProps {
  question: string;
  chance: number;
  totalBet: number;
  yesVotes: number;
  noVotes: number;
  isLogged: any;
  setIsLogged: any
}
export const runtime = "edge"

const GaugeIcon: React.FC<{ chance: number }> = ({ chance }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - chance) / 100) * circumference;

  return (
    <div className="relative w-10 h-10">
      <svg className="absolute w-20 h-20 -top-5 -right-5 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-600 transition-all duration-500 ease-in-out"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-700">{chance}%</span>
      </div>
    </div>
  );
};

const BetCard: React.FC<BetCardProps> = ({ question, chance, totalBet, yesVotes, noVotes, isLogged, setIsLogged }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [odds, setOdds] = useState<number>(150);
  
  async function onClickBet(bet: string) {

    try {
    const response = await axios.post(`${window.location.origin}/api/setBlink`, {
      amount: betAmount,
      team: bet
    }, {
      withCredentials: true
    })

    console.log("Status: ", response.status)
 
    if(!response.data.success) { 
      alert(response.data.msg);
      return
    }

    alert("Successfully submitted bet!")
} catch (err) {
  alert("Some internal error occured")
  return
}
  
  }

  function onClickModal() {
    setIsOpen(true)
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-full space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-bold text-gray-800 flex-grow pr-2">{question}</h2>
        <GaugeIcon chance={chance} />
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-600">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="font-semibold">${totalBet.toLocaleString()}</span>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="font-semibold">{yesVotes}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span className="font-semibold">{noVotes}</span>
          </div>
        </div>
      </div>
      
      {/* Input fields for Amount and Odds */}
      <div className="space-y-2">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={betAmount ? betAmount : 0}
            onChange={(e) => {
              if (Number(e.target.value) <= 0){
                setBetAmount(0)
                return
              }
              setBetAmount(Number(e.target.value))}}
            className="mt-1 p-2 border border-gray-300 rounded-md text-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Odds</label>
          <input
            type="number"
            value={odds ? odds : 0}
            onChange={(e) => {
              if (Number(e.target.value) <= 0){
                setOdds(0)
                return
              }
              setOdds(Number(e.target.value))}}
            className="mt-1 p-2 border border-gray-300 rounded-md text-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter odds"
          />
        </div>
      </div>
      
      <div className="flex justify-between space-x-2">
        <button
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => (isLogged ? onClickBet('Miami') : onClickModal())}
        >
          Miami
        </button>
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => (isLogged ? onClickBet('NYC') : onClickModal())}
        >
          NYC
        </button>
      </div>
      <Modal isOpen={isOpen} setIsLogged={setIsLogged} isLogged={isLogged} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default BetCard;
