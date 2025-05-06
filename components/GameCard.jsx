import React from 'react';
import { FaStar } from "react-icons/fa6";

const GameCard = ({ MetaData }) => {
  // Replace with a default placeholder URL if needed
  console.log(MetaData)
  if (!MetaData) {
    return <></>
  }

  return (
    <div className="w-full overflow-x-hidden border rounded-md relative pb-2">
      <img src={MetaData.posterUrl} className="items-center object-cover w-full aspect-video " />
      <p className="mt-2 text-center">
        {MetaData.name ? MetaData.name : MetaData.title}
      </p>
      {
        <div className="absolute top-2 right-2 rounded-md bg-background/80 backdrop-blur-sm px-2 py-1 font-sans text-sm flex items-center gap-1 shadow">
          <FaStar className="text-amber-400 w-4 h-4" />
          <span className="font-semibold">{MetaData.rating}</span>
        </div>
      }


    </div>
  );
};

export default GameCard;
