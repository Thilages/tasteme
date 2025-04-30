import React from 'react'
import { FaStar } from "react-icons/fa6";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original"

const MovieCard = ({ metaData }) => {
  const poster_url = POSTER_BASE_URL.concat(metaData.poster_path)
  console.log(poster_url)
  return (
    <div className='text-foreground group border border-foreground/10 rounded-md'>
      <div className='px-2 pt-1 pb-3 relative'>
        <img src={poster_url} className='object-contain' />
        <p className='mt-2  text-center  '>{metaData.title}</p>
        <div className='rounded-md  absolute bg-background p-2 font-sans top-3 right-3 flex items-center gap-2'><FaStar className='text-amber-300'/>4.5/5</div>
      </div>
    </div>
  )
}

export default MovieCard