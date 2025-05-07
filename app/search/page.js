'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { SearchGames, SearchMovies, SearchSongs, SearchTVShows } from '@/api/movieDataBase';
import SearchSelection from '@/components/SearchSelection';
import SearchMovieCard from '@/components/SearchMovieCard';
import SearchGameCard from '@/components/SearchGameCard';
import SearchSongsCard from '@/components/SearchSongsCard';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const Page = () => {
  const [selectedGenre, setselectedGenre] = useState("Movies");
  const [searchQuery, setSearchQuery] = useState("");
  const [SearchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounceSearch = useCallback(
    (query) => {
      if (!query.trim()) {
        setSearchList([]);
        return;
      }

      setLoading(true);
      const fetchResults = async () => {
        try {
          let results = [];
          switch (selectedGenre) {
            case "Movies":
              results = await SearchMovies(query);
              break;
            case "TV Shows":
              results = await SearchTVShows(query);
              break;
            case "Games":
              results = await SearchGames(query);
              break;
            case "Songs":
              results = await SearchSongs(query);
              break;
            default:
              console.log("Invalid genre selection.");
          }
          setSearchList(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchList([]);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    },
    [selectedGenre]
  );

  const handleSearchList = (item, key) => {
    if (selectedGenre === "Movies" || selectedGenre === "TV Shows") {
      return <SearchMovieCard key={key} MetaData={item} />;
    } else if (selectedGenre === "Games") {
      return <SearchGameCard key={key} MetaData={item} />;
    } else { return <SearchSongsCard key={key} metadata={item} />; }

  };

  // Debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      debounceSearch(searchQuery);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounce); // Cleanup on unmount or query change
  }, [searchQuery, debounceSearch]);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='mt-5'>

      <div className="pb-20 sm:pl-[100px] w-full max-w-[1000px] mx-auto  px-5 sm:px-10 flex flex-col items-center">
        {/* Search Bar */}
        <div className='w-full pb-5 flex items-center'>
          <Link href="/">
            <p className='font-stretch-50% font-prim text-2xl font-black 
                      hover:cursor-pointer hover:scale-110 '>
               tasteME.
            </p>
          </Link>
        </div>
        <div className="flex w-full gap-5">
          <Input
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className=""
            type="text"
            placeholder="Type something here..."
          />
        </div>

        {/* Divider */}
        <div className="w-[80%] border border-foreground/10 mt-3" />

        {/* Search Genre Selection */}
        <SearchSelection setSelectedGenre={setselectedGenre} SelectedGenre={selectedGenre} />

        {/* Results */}
        <div
          className={
            selectedGenre === "Games" || "Songs"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4"
              : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-4"
          }
        >
          {loading ? (
            <div className="col-span-full text-center text-gray-500">Searching...</div>
          ) : SearchList.length > 0 ? (
            SearchList.map((item, key) => handleSearchList(item, key))
          ) : (
            <div className="col-span-full text-center mt-10 text-gray-500">No results found.</div>
          )}
        </div>
      </div></div>
  );
};

export default Page;
