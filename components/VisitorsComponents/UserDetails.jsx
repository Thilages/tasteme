'use client';

import React, { useState } from 'react';
import { MdMovie } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
// Ensure fetchGenres API function exists

// Card Component
const Card = ({ genre }) => {


  // Get the first key and value dynamically from the input object
  const [category, name] = Object.entries(genre)[0];


  const bgColor =
    category === "movie" ? "bg-green-200" :
      category === "game" ? "bg-blue-200" :
        "bg-pink-200";

  const textColor =
    category === "movie" ? "text-green-800" :
      category === "game" ? "text-blue-800" :
        "text-pink-800";

  return (
    <div className={`${bgColor} ${textColor} px-3 py-1.5 rounded-full w-fit text-sm font-medium shadow-sm`}>
      <div className="flex items-center gap-1">
        {category === "movie" ? <MdMovie className="text-lg" /> :
          category === "game" ? <FaGamepad className="text-lg" /> :
            <IoMdMusicalNote className="text-lg" />}
        {name}
      </div>
    </div>
  );
};


// UserInfo Component
const UserDetails = ({ details }) => {

  console.log(details, "ff")






  return (
    <div className="bg-foreground shadow-lg rounded-xl p-6 md:p-8 grid md:grid-cols-2 gap-8">
      {/* Left Column: User Details and Genres */}
      <div className="col-span-1 flex flex-col justify-between">
        <div>
          <p className="font-bold text-4xl text-background/90 mb-2">{details.name || "Wait a second"}</p>
          <p className="text-background/60 text-lg">{details.bio || "Okay,Wait 2 seconds"}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {details.gerne?.length > 0 ? (
            details.gerne.map((item, index) => (
              <Card key={index} genre={item} />
            ))
          ) : (
            <p className="text-background/60"></p>
          )}
        </div>


      </div>

      {/* Right Column: Eclectic Description */}
      <div className="flex flex-col">
        <p className="font-semibold text-2xl text-background/70 mb-4 border-b pb-2 border-background/30">
          {details.tasteTitle ? details.tasteTitle : "TILL NOT UNLOCKED"}
        </p>
        <p className="text-background/70 leading-relaxed">
          {details.tasteDetails
            ? details.tasteDetails
            : "yet to complete this"}
        </p>
      </div>

    </div>
  );
};

export default UserDetails;
