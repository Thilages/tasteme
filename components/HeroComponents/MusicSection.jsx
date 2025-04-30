import React from 'react'
import { Button } from '../ui/button'
const MusicSection = () => {
  return (
    <div><div className='flex justify-between items-center'>
      <p className='text-2xl font-semibold'>Your Musics</p>
      <Button variant="outline">Add more</Button>
    </div></div>
  )
}

export default MusicSection