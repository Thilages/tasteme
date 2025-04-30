import React from 'react'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa6'

const LibraryInfo = () => {
  return (

    <><Button className="w-full flex justify-center items-center gap-2  py-2 px-4 rounded-md">
      <FaPlus size={20} />
      Add a Post
    </Button>
      <div className="w-full border-t border-muted mt-6"></div>
      <div className="mt-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-foreground">Your Library</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-foreground/80">Movies</p>
          <span className="text-lg font-semibold text-foreground">05</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-foreground/80">Games</p>
          <span className="text-lg font-semibold text-foreground">08</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-foreground/80">Songs</p>
          <span className="text-lg font-semibold text-foreground">43</span>
        </div>
      </div></>

  )
}

export default LibraryInfo