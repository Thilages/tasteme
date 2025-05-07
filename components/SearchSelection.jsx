import React from 'react'

const SearchSelection = ({ SelectedGenre, setSelectedGenre }) => {

  const Genre = ["Movies", "Games", "Songs"]

  return (
    <div className='flex border rounded-md overflow-hidden  border-foreground/50 mt-4' >
      {Genre.map((genre, index) => (
        <div key={index}
          onClick={() => setSelectedGenre(genre)}
          className={`${SelectedGenre == genre ?
            "bg-foreground text-background" :
            "bg-background text-foreground"} 
                    px-2 py-1 hover:cursor-pointer `}>
          {genre}
        </div>
      ))}
    </div>
  )
}

export default SearchSelection