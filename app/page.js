import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Link from 'next/link'
import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { RiShareBoxLine } from "react-icons/ri";


const page = () => {
  return (

    <div className='pb-20 sm:pl-[100px] w-full py-5 px-5 sm:px-10'>

      <Navbar />  
      <Hero />
    </div>

  )
}

export default page