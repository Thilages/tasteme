import React from 'react'
import { FaStar } from 'react-icons/fa6'
const SongsCard = ({ MetaData }) => {
  console.log(MetaData)
  return (
    <div className="flex relative w-full   border border-foreground/20 rounded-lg ">
      {/* Image Section */}
      <div className="w-1/3 flex-shrink-0">
        <img
          src={MetaData.posterUrl}

          className="w-full h-full rounded-l-md object-cover"
          loading="lazy"
        />
      </div>

      {/* Song Title Section */}
      <div className="flex w-full mt-10 items-end pl-4 py-2">
        <p
          className="text-md w-full  line-clamp-2"
          title={MetaData.name} // Tooltip with the full name
        >
          {MetaData.name || 'Unknown Song'}
        </p>
      </div>
      <div className='absolute top-2 right-2 rounded-md bg-foreground/10 backdrop-blur-sm px-2 py-1 font-sans text-sm flex items-center gap-1 shadow'>
        <FaStar className='text-amber-400 w-4 h-4' /> {/* Slightly adjusted star color/size */}
        <span className='font-semibold'>{MetaData.rating}</span>
      </div>
    </div>
  )
}

export default SongsCard