'use client'
import React, { useState } from 'react';
import LibraryInfo from './HeroComponents/LibraryInfo';
import UserInfo from './HeroComponents/UserInfo';
import MovieSection from './HeroComponents/MovieSection';
import Gamesection from './HeroComponents/Gamesection';
import MusicSection from './HeroComponents/MusicSection';
const Hero = () => {

  const [activeSection, setActiveSection] = useState('movies'); // Track active section

  const handleSectionChange = (section) => {
    setActiveSection(section); // Change active section
  };
  return (
    <div className="mt-5 flex justify-between gap-10">

      <div className="w-full max-w-[1000px] mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-3  sm:gap-10 flex flex-col">

        {/* Library Section */}
        <div className="col-span-1 p-6 rounded-lg hidden lg:block">
          <LibraryInfo />
        </div>

        {/* Placeholder Section */}
        <div className="col-span-2 bg-foreground/10 h-fit rounded-lg ">
          <UserInfo />
        </div>

        <div className="mt-5 flex flex-col col-span-3">

          {/* Tab buttons */}
          <div className="flex justify-center gap-6 mb-2">
            <button
              className={`py-2 px-4 rounded-lg  ${activeSection === 'movies' ? 'bg-foreground text-background' : 'bg-foreground/30'}`}
              onClick={() => handleSectionChange('movies')}
            >
              Movies
            </button>
            <button
              className={`py-2 px-4 rounded-lg ${activeSection === 'games' ? 'bg-foreground text-background' : 'bg-foreground/30'}`}
              onClick={() => handleSectionChange('games')}
            >
              Games
            </button>
            <button
              className={`py-2 px-4 rounded-lg ${activeSection === 'music' ? 'bg-foreground text-background' : 'bg-foreground/30'}`}
              onClick={() => handleSectionChange('music')}
            >
              Music
            </button>
          </div>

          <div className=" sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 flex flex-col">

            {/* Library Section (always visible) */}


            {/* Conditional Sections */}
            {activeSection === 'movies' && (
              <div className="mt-4 col-span-3">
                <MovieSection />
              </div>
            )}
            {activeSection === 'games' && (
              <div className="mt-4 col-span-3">
                <Gamesection />
              </div>
            )}
            {activeSection === 'music' && (
              <div className="mt-4 col-span-3">
                <MusicSection />
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

export default Hero;
