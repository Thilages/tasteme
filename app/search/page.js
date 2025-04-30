'use client'
import React, { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { SearchMovies } from '@/api/movieDataBase'


const page = () => {

  const input = useRef()

  const [searchQuery, setSearchQuery] = useState("")

  const [MovieList, setMovieList] = useState([])

  const handleSearchQueryChange = () => {
    setSearchQuery(input.current.value)
  }

  const handleSearch = async () => {
    await SearchMovies(searchQuery)
  }

  return (

    <div className='pb-20 sm:pl-[100px] w-full max-w-[1000px] mx-auto py-5 px-5 sm:px-10 flex flex-col items-center'>
      <div className='flex w-full gap-5'>
        <Input ref={input} onChange={() => handleSearchQueryChange()} className="" type="string" placeholder="Type something here.." />
        <Button onClick={() => { handleSearch() }}>Search</Button>
      </div>
      <div className='w-[80%] border border-foreground/10 mt-3' />
    </div>

  )
}

export default page