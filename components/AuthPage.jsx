import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter

} from "@/components/ui/dialog"
import React from 'react'
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useAuth } from "@/context/AuthContext"
const AuthPage = () => {

  const { setshowAlert, setalertMessage } = useAuth()
  



  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col  p-5  mx-auto ">
        <p className="text-3xl font-bold t">Welcome to tasteMe.</p>
        <p className="text-gray-400">Kindly, Login or Signup to continue</p>
        <div className="flex gap-5 mt-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login Your Account</DialogTitle>
                <DialogDescription>
                  Enter your details to log in and start using the app.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    UserName
                  </Label>
                  <Input id="username" placeholder="Thilages" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input id="password" placeholder="Password@123" type="password" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => {
                  setshowAlert(true)
                  setalertMessage("you have sumbiited")
                }}>Login</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-foreground text-background">Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Your Account</DialogTitle>
                <DialogDescription>
                  Fill in your details to sign up and start using the app.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Thilages"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password@123"
                    type="password"
                    className="col-span-3"
                    notnull="true"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirmPassword" className="text-right">
                    Re-type
                  </Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Password@123"
                    type="password"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Sign Up</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>

  )
}

export default AuthPage