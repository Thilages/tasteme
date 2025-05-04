"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAuth } from "@/context/AuthContext";
import { loginUser, SignUpUser } from "@/lib/firebase";

const AuthPage = () => {
  const { setshowAlert, setalertMessage } = useAuth();


  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});


  const handleChange = (e, setState) => {
    setState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };


  const validateLogin = () => {
    const errors = {};
    if (!loginData.username) errors.username = "Username is required.";
    if (!loginData.password) errors.password = "Password is required.";
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const validateSignup = () => {
    const errors = {};
    if (!signupData.username) errors.username = "Username is required.";
    if (!signupData.password) errors.password = "Password is required.";
    if (signupData.password !== signupData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (type === "login") {
      if (!validateLogin()) return;

      await loginUser(
        loginData.username,
        loginData.password,
        (message) => {
          setshowAlert(true)
          setalertMessage(message)
        })
    } else if (type === "signup") {
      if (!validateSignup()) return;

      await SignUpUser(
        signupData.username,
        signupData.password,
        (successMessage) => {
          setshowAlert(true);
          setalertMessage(successMessage);
        }
      );
    }
  };


  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col p-5 mx-auto">
        <p className="text-3xl font-bold">Welcome to tasteMe.</p>
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
              <form onSubmit={(e) => handleSubmit(e, "login")} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Thilages"
                    className="col-span-3"
                    value={loginData.username}
                    onChange={(e) => handleChange(e, setLoginData)}
                  />
                </div>
                {loginErrors.username && <p className="text-red-500">{loginErrors.username}</p>}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password@123"
                    type="password"
                    className="col-span-3"
                    value={loginData.password}
                    onChange={(e) => handleChange(e, setLoginData)}
                  />
                </div>
                {loginErrors.password && <p className="text-red-500">{loginErrors.password}</p>}
                <DialogFooter>
                  <Button type="submit">Login</Button>
                </DialogFooter>
              </form>
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
              <form onSubmit={(e) => handleSubmit(e, "signup")} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Thilages"
                    className="col-span-3"
                    value={signupData.username}
                    onChange={(e) => handleChange(e, setSignupData)}
                  />
                </div>
                {signupErrors.username && <p className="text-red-500">{signupErrors.username}</p>}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="Password@123"
                    type="password"
                    className="col-span-3"
                    value={signupData.password}
                    onChange={(e) => handleChange(e, setSignupData)}
                  />
                </div>
                {signupErrors.password && <p className="text-red-500">{signupErrors.password}</p>}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirmPassword" className="text-right">
                    Re-type
                  </Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Password@123"
                    type="password"
                    className="col-span-3"
                    value={signupData.confirmPassword}
                    onChange={(e) => handleChange(e, setSignupData)}
                  />
                </div>
                {signupErrors.confirmPassword && (
                  <p className="text-red-500">{signupErrors.confirmPassword}</p>
                )}
                <DialogFooter>
                  <Button type="submit">Sign Up</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
