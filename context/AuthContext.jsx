'use client'

import React, { createContext, useState, useEffect, useContext } from "react";
import { checkAuthStatus } from "@/lib/firebase";
// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [showAlert, setshowAlert] = useState(false)
  const [alertMessage, setalertMessage] = useState({ title: "", message: "", error: false })

  useEffect(() => {
    const user = checkAuthStatus((user) => setUser(user)); // Replace with your actual authentication check logic

    

  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, showAlert, setshowAlert, alertMessage, setalertMessage, }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);