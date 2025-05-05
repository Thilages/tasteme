"use client";

import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

const AleartMessage = () => {
  const { user, setUser, showAlert, setshowAlert, alertMessage, setalertMessage } = useAuth();
  const { title = "Notice", message = "", error = false } = alertMessage;

  useEffect(() => {
    console.log("Alert message updated:", alertMessage);
    if (showAlert) {
      const timer = setTimeout(() => {
        setshowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert, setshowAlert, alertMessage]);


  if (!showAlert) return null;

  return (
    <div className="fixed z-50 top-2 right-2" id="alert">
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
