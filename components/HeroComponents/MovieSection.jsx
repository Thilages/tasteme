import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { fetchPopularMovies } from '@/api/movieDataBase'
import MovieCard from '../MovieCard'

const MovieSection = () => {

  const [Movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPopularMovies();
      console.log(data['results'])
      setMovies(data.results)
    }
    fetchData()
  }, [])

  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <p className='text-2xl font-semibold'>Your Movies</p>
        <Button variant="outline">Add more</Button>
      </div>
      <div className='w-full border-t border-foreground/20 mt-2 grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-5'></div>
      <div className='grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-5 mt-2'>{Movies ? Movies.map((item, index) => <MovieCard key={index} metaData={item} />) : <div className='text-foreground'>No Movies to show</div>}</div>
    </div>
  )
}

export default MovieSection