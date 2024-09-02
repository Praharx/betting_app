"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CyberpunkDonationCard from "./BlinkCard";
import Cookies from "js-cookie";

interface bounties {
  availableAmount: number;
  team_user: String;
  id: string;
}
export const runtime = "edge";

function BlinkCardCollection({blinkCreated}: {blinkCreated: any}) {
  const [bets, setBets] = useState<null | bounties[]>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${window.location.origin}/api/getBlinks`,
          {
            withCredentials: true,
          }
        );

        setBets(response.data.blinks);
      } catch (err: any) {
        alert("An unexpected error occured");
      }
    })();
  }, [blinkCreated]);

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-yellow-500 text-center font-semibold text-lg">
        NOTE! This is just a preview. Click on the card to show the preview on
        Dialect.
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10%]">
        {bets?.map((bet, index) => (
          <CyberpunkDonationCard bet={bet} />
        ))}
      </div>
    </div>
  );
}

export default BlinkCardCollection;
