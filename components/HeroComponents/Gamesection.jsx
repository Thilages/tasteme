import React from 'react'
import { Button } from '../ui/button'

const Gamesection = () => {
  return (
    <div><div className='flex justify-between items-center'>
      <p className='text-2xl font-semibold'>Your Games</p>
      <Button variant="outline">Add more</Button>
    </div></div>
  )
}

export default Gamesection