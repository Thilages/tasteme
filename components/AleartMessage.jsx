"use client";

import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

const AleartMessage = () => {
  const { user, setUser, showAlert, setshowAlert, alertMessage, setalertMessage } = useAuth();
  const { title = "Notice", message = "", error = false } = alertMessage;

  useEffect(() => {
    console.log("Alert message updated:", alertMessage); // Debugging log
    if (showAlert) {
      const timer = setTimeout(() => {
        setshowAlert(false); // Hide the alert after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clear the timer on component unmount or `showAlert` change
    }
  }, [showAlert, setshowAlert, alertMessage]); // Add `alertMessage` as a dependency to ensure updates trigger the effect

  // If showAlert is false, don't render the alert
  if (!showAlert) return null;

  return (
    <div className="absolute z-50 top-5 right-5" id="alert">
      <Alert variant={error ? "destructive" : "default"}>
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription className="font-medium">
          {message || "You can add components and dependencies to your app using the CLI."}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AleartMessage;
