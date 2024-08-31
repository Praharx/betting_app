"use client"

import React, { useState } from 'react';

interface Sport {
  name: string;
  active: boolean;
}
export const runtime = "edge"

const SemiNavbar= () => {
  const [sports, setSports] = useState<Sport[]>([
    { name: 'NFL', active: true },
    { name: 'MLB', active: false },
    { name: 'Soccer', active: false },
    { name: 'NBA', active: false },
    { name: 'NHL', active: false },
    { name: 'Tennis', active: false },
    { name: 'Golf', active: false },
  ]);

  const handleSportClick = (clickedSport: string) => {
    setSports(sports.map(sport => ({
      ...sport,
      active: sport.name === clickedSport
    })));
  };

  return (
        <ul className="flex space-x-10 mt-2   cursor-pointer border-b border-gray-300">
          {sports.map((sport) => (
            <li key={sport.name} className={`px-3 py-2 text-white ${
                sport.active 
                  ? 'border-b-2'
                  : ''
              } hover:border-b-2`} onClick={()=> handleSportClick(sport.name)}>
                {sport.name}
            </li>
          ))}
        </ul>
     );
};

export default SemiNavbar;