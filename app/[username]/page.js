'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UserDetails from '@/components/VisitorsComponents/UserDetails';
import { getUserdataByName } from '@/lib/firebase';
import Link from 'next/link';
import MovieDetails from '@/components/VisitorsComponents/MovieDetails';
import GamesDetails from '@/components/VisitorsComponents/GamesDetails';
import SongDetails from '@/components/VisitorsComponents/SongDetails';

const Profile = () => {
  const { username } = useParams();
  const [activeSection, setActiveSection] = useState('movies'); // Track active section
  const [details, setDetails] = useState(null); // Use `null` for better loading logic
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await getUserdataByName(username);
        setDetails(data.length > 0 ? data[0] : null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setDetails(null); // Handle error by clearing `details`
      } finally {
        setIsLoading(false); // Loading complete
      }
    };

    fetchUserData();
  }, [username]);

  const handleSectionChange = (section) => {
    setActiveSection(section); // Change active section
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading user data...</div>;
  }

  if (!details) {
    return <div className="text-center mt-10">User not found or error occurred.</div>;
  }

  return (
    <div className=" items-center flex flex-col justify-center px-5 p-5 sm:p-10">

      <div className="w-full max-w-[1000px] mx-auto sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10 flex flex-col items-center">
        {/* User Details Section */}

        <Link href="/">
          <p className='font-stretch-50% font-prim text-2xl font-black 
                      hover:cursor-pointer hover:scale-110'>
            tasteME.
          </p>
        </Link>
        <div className="max-w-[700px] mx-auto col-span-3 bg-foreground/10 h-fit rounded-lg">
          <UserDetails details={details} />
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
                <MovieDetails details={details} />
              </div>
            )}
            {activeSection === 'games' && (
              <div className="mt-4 col-span-3">
                <GamesDetails details={details} />
              </div>
            )}
            {activeSection === 'music' && (
              <div className="mt-4 col-span-3">
                <SongDetails details={details} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
