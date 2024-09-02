import React, {useState} from 'react';
import BetCard from './betCard'; // Ensure the BetCard component is correctly imported

interface BetCardProps {
  question: string;
  chance: number;
  description: String;
  sideA: String;
  sideB: String;
}
export const runtime = "edge"

const betData: BetCardProps[] = [
  {
    question: 'Miami vs NYC?',
    chance: 35,
    description: "How's gonna win today? Most importantly, you sure which team is gonna get the cup? Prove your surity with betting!",
    sideA:"Bet Miami",
    sideB:"Bet NYC",
  },
  {
    question: 'Will Ethereum surpass Bitcoin?',
    chance: 20,
    description: "Which crypto blockchain will turn come as acquiring more userbase? Ethereum's familarity to ecosystem or Solana's innovation ",
    sideA:"Bet ETH",
    sideB:"Bet SOL",
  },
  {
    question: 'Will Tesla release a flying car?',
    chance: 10,
    description: "Flying Cars? hmm something we can expect from a giant like Tesla, that has revoluntionized the Electrical Car Space.What say?",
    sideA:"Bet YES",
    sideB:"Bet NO",
  },
  {
    question: 'Will AI surpass human intelligence by 2030?',
    chance: 15,
    description: "AI is learning like a human but better than a human these days? What do you think about the AGI?",
    sideA:"Bet YES",
    sideB:"Bet  NO",
  },
  // Add more bet data as needed to see the grid effect
];

const BetCardGrid = ({setBlinkCreate} : {setBlinkCreate: any}) => {
  const [errorText, setErrorText] = useState<null| string>(null)
  return (
    <div className="container mx-auto mt-4">
     { errorText &&
      <h1>
        {errorText}
      </h1>
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {betData.map((bet, index) => (
          <BetCard
            setErrorText={setErrorText}
            setBlinkCreate= {setBlinkCreate}
            key={index}
            question={bet.question}
            chance={bet.chance}
            description={bet.description}
            sideA={bet.sideA}
            sideB={bet.sideB}
          />
        ))}
      </div>
    </div>
  );
};

export default BetCardGrid;