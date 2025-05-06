import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa6'
import { useAuth } from '@/context/AuthContext'
import { getUserData } from '@/lib/firebase'

const LibraryInfo = () => {
  const { user } = useAuth()
  const [details, setdetails] = useState({})
  useEffect(() => {
    // Fetch user details from the database
    const fetchUserData = async () => {
      try {
        const data = await getUserData(user.uid);
        setdetails(data)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch genres from the API

    fetchUserData();

  }, [user.uid]);
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
          <span className="text-lg font-semibold text-foreground">{details?.likedMovies?.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-foreground/80">Games</p>
          <span className="text-lg font-semibold text-foreground">{details?.likedGames?.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-foreground/80">Songs</p>
          <span className="text-lg font-semibold text-foreground">{details?.likedSongs?.length}</span>
        </div>
      </div></>

  )
}

export default LibraryInfo