'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoMdAdd } from "react-icons/io";
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
} from "@/components/ui/alert-dialog";
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';
import { logOutUser } from '@/lib/firebase';

const Navbar = () => {
  const { user, setalertMessage, setshowAlert } = useAuth();
  const [link, setLink] = useState('');

  // Dynamically set the link once the component mounts
  useEffect(() => {
    if (user?.email) {
      // Get base URL (e.g., http://localhost:3000 or https://yourdomain.com)
      const baseUrl = window.location.origin;
      // Create the link with the user's email part (before @)
      const profileLink = `${baseUrl}/${user.email.split("@")[0]}`;
      setLink(profileLink);
    }
  }, [user]);

  const handleLogOut = async () => {
    console.log("Logging out...");
    await logOutUser((message) => {
      setalertMessage(message);
      setshowAlert(true);
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setalertMessage({
      title: "Copied",
      message: "Your profile URL copied successfully",
      error: false
    });
    setshowAlert(true);
  };

  return (
    <div className='flex justify-between items-center max-w-[1000px] mx-auto'>
      {/* Left Section */}
      <Link href="/">
        <p className='font-stretch-50% font-prim text-2xl font-black 
                      hover:cursor-pointer hover:scale-110'>
          tasteME.
        </p>
      </Link>

      {/* Right Section */}
      <div className='flex justify-center items-center gap-5'>
        {/* Add Button */}
        <Button onClick={() => window.location.href = window.location.href + "search"} variant="outline" className="rounded-full">
          <IoMdAdd />
        </Button>

        {/* Share Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="rounded-full">
              🔗
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[90%] sm:max-w-[400px] mx-auto text-center">
            <AlertDialogHeader>
              <AlertDialogTitle>Share Profile</AlertDialogTitle>
              <AlertDialogDescription>
                Copy the link below to share your profile with others.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                value={link}
                readOnly
                className="w-full p-2 border rounded text-center max-w-full"
              />
              <Button onClick={handleCopy} className="w-fit ml-auto">
                Copy Link
              </Button>
            </div>
            <AlertDialogFooter className="mt-4 absolute -top-2 right-3">
              <AlertDialogCancel>x</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Logout Button */}
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
  );
};

export default Navbar;
