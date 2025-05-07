import React from 'react'
import SongsCard from '../SongsCard'
const SongDetails = ({ details }) => {
  console.log(details)
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <p className='text-2xl font-semibold'>{details.name}'s Songs</p>

      </div>
      <div className='w-full border-t border-foreground/20 mt-2 '></div>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 mt-2'>{details.likedSongs ? details.likedSongs.map((item, index) => <SongsCard key={index} MetaData={item} />) : <div className='text-foreground'>No Movies to show</div>}</div>
    </div>
  )
}

export default SongDetails