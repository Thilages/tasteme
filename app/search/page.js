'use client'
import React, { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { SearchMovies, SearchTVShows } from '@/api/movieDataBase'
import SearchSelection from '@/components/SearchSelection'

import SearchMovieCard from '@/components/SearchMovieCard'


const page = () => {

  const input = useRef()

  const [selectedGenre, setselectedGenre] = useState("Movies")

  const [searchQuery, setSearchQuery] = useState("")

  const [SearchList, setSearchList] = useState([])

  const handleSearchQueryChange = () => {
    setSearchQuery(input.current.value)
  }

  const handleSearch = async () => {
    switch (selectedGenre) {
      case "Movies":
        const MovieList = await SearchMovies(searchQuery);
        setSearchList(MovieList)
        break;

      case "TV Shows":
        const TVShowList = await SearchTVShows(searchQuery)
        setSearchList(TVShowList)
        break

      default:
        console.log("nothing")
    }
  }

  return (

    <div className='pb-20 sm:pl-[100px] w-full max-w-[1000px] mx-auto py-5 px-5 sm:px-10 flex flex-col items-center'>

      <div className='flex w-full gap-5'>
        <Input ref={input} onChange={() => handleSearchQueryChange()} className="" type="string" placeholder="Type something here.." />
        <Button onClick={() => { handleSearch() }}>Search</Button>
      </div>

      <div className='w-[80%] border border-foreground/10 mt-3' />

      <SearchSelection setSelectedGenre={setselectedGenre} SelectedGenre={selectedGenre} />

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-4' >
        {SearchList.map((item, key) => (
          <SearchMovieCard key={key} MetaData={item} />
        ))}
      </div>
    </div>

  )
}

export default page