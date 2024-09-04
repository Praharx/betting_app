import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

// OddsCalculator remains unchanged
class OddsCalculator {
  private betAmount: number;

  constructor(betAmount: number) {
    this.betAmount = betAmount;
  }

  americanToImpliedProbability(americanOdds: number): number {
    if (americanOdds > 0) {
      return 100 / (americanOdds + 100);
    } else {
      return Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
    }
  }

  calculatePayout(americanOdds: number): {
    toWin: number;
    totalPayout: number;
  } {
    let toWin: number;
    if (americanOdds > 0) {
      toWin = (this.betAmount * americanOdds) / 100;
    } else {
      toWin = (this.betAmount * 100) / Math.abs(americanOdds);
    }
    const totalPayout = this.betAmount + toWin;
    return { toWin, totalPayout };
  }
}

// SemicircleGauge remains unchanged
const SemicircleGauge: React.FC<{ chance: number }> = ({ chance }) => {
  const radius = 50;
  const circumference = Math.PI * radius;
  const progress = ((100 - chance) / 100) * circumference;

  return (
    <div className="relative w-20 h-12">
      <svg className="w-full h-full" viewBox="0 0 100 50">
        <path
          d="M5 45 A 40 40 0 0 1 95 45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <path
          d="M5 45 A 40 40 0 0 1 95 45"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-gray-700 -mt-[1rem]">
          {chance}%
        </span>
        <div className="text-xs font-semibold text-gray-400 ">chance</div>
      </div>
    </div>
  );
};

interface BetCardProps {
  question: string;
  chance: number;
  description: String;
  sideA: String;
  sideB: String;
  setErrorText: Dispatch<SetStateAction<string | null>>;
  setBlinkCreate: Dispatch<SetStateAction<number>>;
}

const BetCard: React.FC<BetCardProps> = ({
  question,
  chance,
  description,
  sideA,
  sideB,
  setErrorText,
  setBlinkCreate,
}) => {
  const [showInputs, setShowInputs] = useState(false);
  const [amount, setAmount] = useState(100);
  const [odds, setOdds] = useState<string>("150");
  const [winAmount, setWinAmount] = useState(150);
  const [totalPayout, setTotalPayout] = useState(250);
  const [side, setSide] = useState<String | null>(null);
  const { publicKey } = useWallet();
  const [oddConstraintText, setConstraintText] = useState<null | String>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(newAmount);
    calculateWinAmount(newAmount, Number(odds));
  };

  const handleOddsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow for negative numbers, decimal points, and temporary empty or '-' inputs
    if (value === "" || value === "-" || /^-?\d*\.?\d*$/.test(value)) {
      setOdds(value);
      // Only calculate if we have a valid number
      if (value !== "" && value !== "-") {
        calculateWinAmount(amount, parseFloat(value));
      }
    }
  };

  const calculateWinAmount = (betAmount: number, americanOdds: number) => {
    const calculator = new OddsCalculator(betAmount);
    const payout = calculator.calculatePayout(americanOdds);
    setWinAmount(payout.toWin);
    setTotalPayout(payout.totalPayout);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-200 shadow-md rounded-lg overflow-hidden h-[280px] flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-sm font-mono text-black">{question}</h2>
        <SemicircleGauge chance={chance} />
      </div>
      <div className="p-4 flex-grow flex flex-col ">
        {!showInputs ? (
          <div className="flex flex-col h-[90%] justify-between">
            <div className="text-sm h-[40%] text-black">{description}</div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setSide(sideA);
                  setShowInputs(true);
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                {sideA}
              </button>
              <button
                onClick={() => {
                  setSide(sideB);
                  setShowInputs(true);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                {sideB}
              </button>
            </div>
          </div>
        ) : (
          <div className="-mt-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
                className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div>
              <label className="text-sm flex font-medium text-gray-700">
                {oddConstraintText ? (
                  <h1 className="text-black">{oddConstraintText}</h1>
                ) : (
                  "Odds"
                )}
              </label>
              <input
                type="text"
                value={odds}
                onChange={handleOddsChange}
                placeholder="Odds"
                className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <button
              onClick={async () => {
                if (!(amount || odds || winAmount)) {
                  alert("Put all the appropriate amounts please");
                  return;
                }
                if (!publicKey) {
                  setErrorText(
                    "Please connect your wallet before creating a bet"
                  );
                  return;
                }
                if (!(parseFloat(odds) > 100 || parseFloat(odds) < -100)) {
                  setConstraintText("Odds must be greater than 100 or less than -100");
                  return;
                }
                try {
                  const response = await axios.post(
                    `${window.location.origin}/api/setBlink`,
                    {
                      betAmount: amount,
                      payout: winAmount,
                      address: publicKey,
                      side,
                    }
                  );

                  if (!response.data.success) {
                    alert("Please provide valid inputs");
                    return;
                  }

                  alert(response.data.msg);
                  setBlinkCreate((prevVal: any) => prevVal + 1);
                } catch (err) {
                  alert("Couldn't create a blink, please try again later");
                }
              }}
              disabled={amount === 0 || parseFloat(odds) === 0 || !amount || !odds}
              className={`w-full ${
                side === sideA
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white font-bold py-2 rounded mt-2`}
            >
              {side}
              <br />
              {totalPayout ? `Total Payout: ${totalPayout.toFixed(2)}` : ""}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetCard;
