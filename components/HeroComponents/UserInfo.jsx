import React from 'react';
import { MdMovie } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";

// Card Component with enhanced styling
const Card = ({ genre, catagry }) => {
  // Determine colors based on category with slightly refined shades
  const bgColor = catagry === "movie" ? "bg-green-200" :
                  catagry === "game" ? "bg-blue-200" :
                  "bg-pink-200";

  const textColor = catagry === "movie" ? "text-green-800" :
                    catagry === "game" ? "text-blue-800" :
                    "text-pink-800";

  return (
    <div className={`${bgColor} ${textColor} px-3 py-1.5 rounded-full w-fit text-sm font-medium shadow-sm`}>
      <div className="flex items-center gap-1">
        {catagry === "movie" ? <MdMovie className="text-lg" /> :
         catagry === "game" ? <FaGamepad className="text-lg" /> :
         <IoMdMusicalNote className="text-lg" />}
        {genre}
      </div>
    </div>
  );
}

const musicGenres = [
  { genre: "sci-fi", type: "movie" },
  { genre: "drama", type: "movie" },
  { genre: "fps", type: "game" },
  { genre: "rpg", type: "game" },
  { genre: "jazz", type: "song" },
  { genre: "rock", type: "song" }
];

// UserInfo Component with enhanced layout and typography
const UserInfo = () => {
  return (
    <div className='bg-foreground shadow-lg rounded-xl p-6 md:p-8 grid md:grid-cols-2 gap-8'>

      {/* Left Column: User Details and Genres */}
      <div className='col-span-1 flex flex-col justify-between'>
        <div>
          <p className='font-bold text-4xl text-background/90 mb-2'>Thilagesh </p>
          <p className='text-background/60 text-lg'>"I watch Movies and shit"</p>
        </div>

        <div className='mt-6 flex flex-wrap gap-3'>
          {musicGenres.map((item, index) =>
            <Card key={index} genre={item.genre} catagry={item.type} />
          )}
        </div>
      </div>

      {/* Right Column: Eclectic Description */}
      <div className='flex flex-col'>
        <p className='font-semibold text-2xl text-background/70 mb-4 border-b pb-2 border-background/30'>Eclectic Tastes</p>
        <p className='text-background/70 leading-relaxed'>
          This captures the idea of having diverse tastes or preferences across different genres in a concise way. It highlights a broad appreciation for various forms of entertainment and art.
        </p>
      </div>

    </div>
  );
}

export default UserInfo;