import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { fetchPopularMovies } from '@/api/movieDataBase'
import MovieCard from '../MovieCard'
import { useAuth } from '@/context/AuthContext'
import { getLikedMovies } from '@/lib/firebase'

const MovieSection = () => {
  const { user } = useAuth()
  const [Movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLikedMovies(user.uid)
      console.log(data)
      setMovies(data)

    }
    fetchData()
  }, [])

  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <p className='text-2xl font-semibold'>Your Movies</p>
        <Button variant="outline">Add more</Button>
      </div>
      <div className='w-full border-t border-foreground/20 mt-2 '></div>
      <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 mt-2'>{Movies ? Movies.map((item, index) => <MovieCard key={index} metaData={item} />) : <div className='text-foreground'>No Movies to show</div>}</div>
    </div>
  )
}

export default MovieSection