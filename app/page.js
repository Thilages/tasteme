'use client'
import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AuthPage from "../components/AuthPage";

const HomePage = () => {
  const { user } = useAuth()


  return (
    <div
      className={`${user
        ? "pb-20 sm:pl-[100px] w-full py-5 px-5 sm:px-10 h-screen"
        : "h-screen w-full"
        }`}
    >
      {user ? (
        <>
          <Navbar />
          <Hero />
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export default HomePage;
