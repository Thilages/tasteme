'use client'
import React from 'react'
import Link from 'next/link'
import { IoMdAdd } from "react-icons/io";
import { RiShareBoxLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center'>
      {/* left section */}
      <Link href="/">
        <p className='font-stretch-50% font-prim text-2xl font-black 
                      hover:cursor-pointer hover:scale-110'>
          tasteME.
        </p>
      </Link>
      {/* right */}
      <div className='flex justify-center items-center gap-5'>
        {/* add */}
        <button className='p-1 text-foreground border-2 border-foreground 
                            rounded-full hover:cursor-pointer hover:bg-foreground 
                            hover:text-background transition-colors duration-300'>
          <IoMdAdd />
        </button>
        {/* share */}
        <button className='p-2 px-3 flex items-center  font-semibold gap-2 text-background border-2 bg-foreground
                            rounded-full hover:cursor-pointer hover:bg-background 
                            hover:text-foreground transition-colors duration-300'>
          <RiShareBoxLine /> Share
        </button>
      </div>
    </div>
  )
}

export default Navbar