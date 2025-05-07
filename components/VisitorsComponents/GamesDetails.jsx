import React from 'react'
import GameCard from '../GameCard'
const GamesDetails = ({ details }) => {
  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <p className='text-2xl font-semibold'>{details.name}'s Games</p>

      </div>
      <div className='w-full border-t border-foreground/20 mt-2 '></div>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 mt-2'>{details.likedGames ? details.likedGames.map((item, index) => <GameCard key={index} MetaData={item} />) : <div className='text-foreground'>No Movies to show</div>}</div>
    </div>
  )
}

export default GamesDetails