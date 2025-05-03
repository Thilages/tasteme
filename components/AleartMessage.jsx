"use client"

import React, { useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from '@/context/AuthContext'
// Assuming Terminal is an icon component


const AleartMessage = () => {
  const { showAlert, setshowAlert, alertMessage } = useAuth()

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setshowAlert(false) // Hide the alert after 3 seconds
      }, 3000)

      return () => clearTimeout(timer) // Clear the timer when the component unmounts or showAlert changes
    }
  }, [showAlert, setshowAlert]) // Dependency on showAlert to trigger the effect

  // If showAlert is false, don't render the alert
  if (!showAlert) return null

  return (
    <div className='absolute z-50 top-10 right-10 ' id='alert'>
      <Alert>

        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          {alertMessage || "You can add components and dependencies to your app using the CLI."}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default AleartMessage
