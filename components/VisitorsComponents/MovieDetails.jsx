import React from 'react'

import MovieCard from '../MovieCard'


const MovieDetails = ({ details }) => {


  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <p className='text-2xl font-semibold'>{details.name}'s Movies</p>

      </div>
      <div className='w-full border-t border-foreground/20 mt-2 '></div>
      <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 mt-2'>{details.likedMovies ? details.likedMovies.map((item, index) => <MovieCard key={index} metaData={item} />) : <div className='text-foreground'>No Movies to show</div>}</div>
    </div>
  )
}

export default MovieDetails