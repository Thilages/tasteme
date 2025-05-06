import React from 'react'
import { FaStar } from "react-icons/fa6";

// Use a specific size like w500 instead of original for better performance
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
// Define a fallback poster path (replace with your actual placeholder)
const FALLBACK_POSTER_URL = "/placeholder-poster.png";

const MovieCard = ({ metaData }) => {
  // Gracefully handle missing data
  const posterUrl = metaData?.posterUrl
    ? POSTER_BASE_URL + metaData.posterUrl
    : FALLBACK_POSTER_URL;
  const title = metaData?.name || "Untitled Movie";
  const rating = metaData?.rating  // Format rating to 1 decimal place

  return (
    // Card container: Added overflow-hidden, subtle background, shadow, hover effect, and transition
    <div className='text-foreground group border border-foreground/10 rounded-lg overflow-hidden bg-background/5 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out'>
      {/* Image and Rating wrapper */}
      <div className='relative'>
        <img
          src={posterUrl}
          alt={title} // Added descriptive alt text
          // Image styling: object-cover fills container, aspect ratio maintains shape, added subtle background
          className='object-cover w-full aspect-[2/3] bg-foreground/10 group-hover:opacity-90 transition-opacity duration-200'
          loading="lazy" // Lazy load images for performance
          onError={(e) => { // Handle cases where the image fails to load
            e.currentTarget.src = FALLBACK_POSTER_URL;
            e.currentTarget.onerror = null; // Prevent infinite loops
          }}
        />
        {/* Rating Badge: Only show if rating exists. Adjusted styling. */}
        {
          <div className='absolute top-2 right-2 rounded-md bg-background/80 backdrop-blur-sm px-2 py-1 font-sans text-sm flex items-center gap-1 shadow'>
            <FaStar className='text-amber-400 w-4 h-4' /> {/* Slightly adjusted star color/size */}
            <span className='font-semibold'>{rating}</span>
          </div>
        }
      </div>

      {/* Title Area: Added padding, centered text, bolder font, truncation */}
      <div className='p-3'>
        <p
          className='text-center font-semibold truncate text-base' // Use truncate for long titles
          title={title} // Show full title on hover
        >
          {title}
        </p>
      </div>
    </div>
  )
}

export default MovieCard;