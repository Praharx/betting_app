import React from 'react';
import BetCard from './betCard'; // Ensure the BetCard component is correctly imported

interface BetCardProps {
  question: string;
  chance: number;
  totalBet: number;
  yesVotes: number;
  noVotes: number;
}
export const runtime = "edge"

const betData: BetCardProps[] = [
  {
    question: 'Miamai vs NYC?',
    chance: 35,
    totalBet: 125000,
    yesVotes: 230,
    noVotes: 120,
  },
  {
    question: 'Will Ethereum surpass Bitcoin in market cap?',
    chance: 20,
    totalBet: 98000,
    yesVotes: 180,
    noVotes: 150,
  },
  {
    question: 'Will Tesla release a flying car?',
    chance: 10,
    totalBet: 45000,
    yesVotes: 50,
    noVotes: 200,
  },
  {
    question: 'Will AI surpass human intelligence by 2030?',
    chance: 15,
    totalBet: 75000,
    yesVotes: 100,
    noVotes: 300,
  },
  // Add more bet data as needed to see the grid effect
];

const BetCardGrid = ({isLogged, setIsLogged}: {isLogged: any, setIsLogged: any}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {betData.map((bet, index) => (
          <BetCard
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            key={index}
            question={bet.question}
            chance={bet.chance}
            totalBet={bet.totalBet}
            yesVotes={bet.yesVotes}
            noVotes={bet.noVotes}
          />
        ))}
      </div>
    </div>
  );
};

export default BetCardGrid;