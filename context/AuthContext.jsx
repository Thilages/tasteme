'use client'

import React, { createContext, useState, useEffect, useContext } from "react";
import { checkAuthStatus } from "@/api/firebase";
// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [showAlert, setshowAlert] = useState(false)
  const [alertMessage, setalertMessage] = useState({ title: "", message: "", error: false })

  useEffect(() => {
    const user = checkAuthStatus(); // Replace with your actual authentication check logic
    setAuthStatus(user);
  }, []);

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, showAlert, setshowAlert, setalertMessage, alertMessage }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);