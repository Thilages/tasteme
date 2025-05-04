'use client'
import React from 'react'
import Link from 'next/link'
import { IoMdAdd } from "react-icons/io";
import { RiShareBoxLine } from "react-icons/ri";
import { Button } from './ui/button';
import { AiOutlineLogout } from "react-icons/ai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { logOutUser } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { setalertMessage, setshowAlert } = useAuth()
  const handleLogOut = async () => {
    console.log("ff")
    await logOutUser((message) => {
      setalertMessage(message)
      setshowAlert(true)
    })
  }

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

        {/* share */}
        <button className='p-2 px-3 flex items-center justify-center  font-semibold gap-2 text-background border-2 bg-foreground
                            rounded-full hover:cursor-pointer hover:bg-background 
                            hover:text-foreground transition-colors duration-300'>
          <RiShareBoxLine /> {window.innerWidth > 500 ? "Share" : ""}
        </button>
        <Button variant="outline" className="rounded-full">
          <IoMdAdd />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="rounded-full">
              <AiOutlineLogout />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Logging out will securely end your session and require you to log back in to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogOut}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  )
}

export default Navbar