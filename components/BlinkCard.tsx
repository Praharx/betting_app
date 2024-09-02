import React from 'react';

interface bounties{
  availableAmount: number,
  team_user: String,
  id: string
}

export const runtime = "edge"
const CyberpunkDonationCard = ({bet}: {bet: bounties}) => {
  return (
    <a href={`https://dial.to/?action=solana-action%3A${encodeURIComponent(window.location.origin)}%2Fapi%2Factions%3Fid%3D${bet.id}&cluster=devnet`} className="bg-gray-900 p-6 rounded-xl shadow-lg w-80 mx-auto font-sans">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-1 rounded-lg shadow-inner mb-4">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1719937050792-a6a15d899281?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" 
            alt="Cyberpunk character" 
            className="w-full h-[30vh] rounded object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/50 to-transparent rounded"></div>
        </div>
      </div>
      
      <div className="text-cyan-300 text-sm mb-2">Bet for {bet.team_user == "NYC" ? "Miami" : "NYC"}</div>
      <div className="text-gray-400 text-xs mb-4">A match b/w NYC & Miami. I have bet on NYC? Do you have the guts to bet against me?? Come try to fade me if you can!</div>
      <div className="text-gray-400 text-xs mb-4">Select a maximum of {bet.availableAmount} SOL</div>

      <div className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Enter a custom SOL amount" 
          className="bg-gray-800 text-white text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
          Submit
        </button>
      </div>
    </a>
  );
};

export default CyberpunkDonationCard;