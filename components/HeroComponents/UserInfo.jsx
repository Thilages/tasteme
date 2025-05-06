'use client';

import React, { useEffect, useState } from 'react';
import { MdMovie } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { getUserData, upDataProfile } from '@/lib/firebase';

// Card Component
const Card = ({ genre, catagry }) => {
  const bgColor = catagry === "movie" ? "bg-green-200" :
    catagry === "game" ? "bg-blue-200" :
      "bg-pink-200";

  const textColor = catagry === "movie" ? "text-green-800" :
    catagry === "game" ? "text-blue-800" :
      "text-pink-800";

  return (
    <div className={`${bgColor} ${textColor} px-3 py-1.5 rounded-full w-fit text-sm font-medium shadow-sm`}>
      <div className="flex items-center gap-1">
        {catagry === "movie" ? <MdMovie className="text-lg" /> :
          catagry === "game" ? <FaGamepad className="text-lg" /> :
            <IoMdMusicalNote className="text-lg" />}
        {genre}
      </div>
    </div>
  );
};

const musicGenres = [
  { genre: "sci-fi", type: "movie" },
  { genre: "drama", type: "movie" },
  { genre: "fps", type: "game" },
  { genre: "rpg", type: "game" },
  { genre: "jazz", type: "song" },
  { genre: "rock", type: "song" }
];

// UserInfo Component
const UserInfo = () => {
  const { user, setalertMessage, setshowAlert } = useAuth();
  const [bio, setBio] = useState("");
  const [dbData, setDbData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    // Fetch user details from the database
    const fetchUserData = async () => {
      try {
        const data = await getUserData(user.uid);
        console.log(data)
        setDbData({
          name: data.name || "Anonymous",
          bio: data.bio || "add a bio"
        });
        setBio(typeof data.bio === "string" ? data.bio : "Add a bio here...");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.uid]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      // Send updated bio to the database
      await upDataProfile(user.uid, bio, (message) => {
        setshowAlert(true);
        setalertMessage(message);
      });
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div className="bg-foreground shadow-lg rounded-xl p-6 md:p-8 grid md:grid-cols-2 gap-8">
      {/* Left Column: User Details and Genres */}
      <div className="col-span-1 flex flex-col justify-between">
        <div>
          <p className="font-bold text-4xl text-background/90 mb-2">{dbData.name || "Wait a second"}</p>
          <p className="text-background/60 text-lg">{dbData.bio || "Okay,Wait 2 seconds"}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {musicGenres.map((item, index) => (
            <Card key={index} genre={item.genre} catagry={item.type} />
          ))}
        </div>

        <div className="w-fit mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Edit Bio</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Bio</DialogTitle>
                <DialogDescription>
                  Make changes to your bio here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    value={bio}
                    onChange={handleBioChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Right Column: Eclectic Description */}
      <div className="flex flex-col">
        <p className="font-semibold text-2xl text-background/70 mb-4 border-b pb-2 border-background/30">Eclectic Tastes</p>
        <p className="text-background/70 leading-relaxed">
          This captures the idea of having diverse tastes or preferences across different genres in a concise way. It highlights a broad appreciation for various forms of entertainment and art.
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
