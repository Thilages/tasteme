import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

import MovieCard from '../MovieCard'
import { useAuth } from '@/context/AuthContext'
import { getLikedGames } from '@/lib/firebase'
import GameCard from '../GameCard'
import { useRouter } from 'next/navigation'

const GameSection = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [Movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLikedGames(user.uid)

      setMovies(data)

    }
    fetchData()
  }, [])

  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <p className='text-2xl font-semibold'>Your games</p>
        <Button onClick={() => router.push("/search")} variant="outline">Add more</Button>
      </div>
      <div className='w-full border-t border-foreground/20 mt-2 '></div>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 mt-2'>{Movies ? Movies.map((item, index) => <GameCard key={index} MetaData={item} />) : <div className='text-foreground'>No Movies to show</div>}</div>
    </div>
  )
}

export default GameSection