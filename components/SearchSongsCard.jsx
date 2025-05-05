import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { AddSongs } from '@/lib/firebase';


const SearchSongsCard = ({ metadata }) => {
  if (!metadata) return null; // Gracefully handle missing metadata
  const { user, setshowAlert, setalertMessage } = useAuth()
  const [rating, setRating] = useState(2.5);
  const { posterUrl, name } = metadata; // Destructure metadata for cleaner code

  const handleItemSave = async () => {

    const data = {
      name: name,
      posterUrl: posterUrl,
      rating: rating
    }

    await AddSongs(user.uid, data, (message) => {
      setshowAlert(true)
      setalertMessage(message)
    })

  }


  return (
    <div className="flex relative w-full   border border-foreground/20 rounded-lg ">
      {/* Image Section */}
      <div className="w-1/3 flex-shrink-0">
        <img
          src={posterUrl}
          alt={name}
          className="w-full h-full rounded-l-md object-cover"
          loading="lazy"
        />
      </div>

      {/* Song Title Section */}
      <div className="flex w-full mt-10 items-end pl-4 py-2">
        <p
          className="text-md w-full  line-clamp-2"
          title={name} // Tooltip with the full name
        >
          {name || 'Unknown Song'}
        </p>
      </div>
      <div className='absolute top-2 right-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="rounded-full py-1 px-2 text-sm flex items-center gap-2"
              variant="secondary"
            >
              <CiCirclePlus size={20} />
              Taste It
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add to Collection</h4>
                <p className="text-sm text-muted-foreground">Rate the Item</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center space-x-2 col-span-2">
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => setRating((prev) => Math.max(prev - 0.5, 0))}
                    >
                      -
                    </Button>
                    <Input
                      id="rating"
                      type="number"
                      value={rating.toFixed(1)}
                      readOnly
                      className="text-center font-sans w-16 h-8"
                    />
                    <Button
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => setRating((prev) => Math.min(prev + 0.5, 5))}
                    >
                      +
                    </Button>
                  </div>
                  <Button onClick={handleItemSave} className="">Save</Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SearchSongsCard;
