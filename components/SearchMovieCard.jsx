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

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original";

const SearchMovieCard = ({ MetaData }) => {
  const [rating, setRating] = useState(2.5);

  const posterPath = POSTER_BASE_URL.concat(MetaData.poster_path);

  if (!MetaData.poster_path) {
    return null;
  }

  const handleItemSave = async () => {
    console.log(MetaData)
    console.log(rating)
  }


  return (
    <div className="w-full p-2 border rounded-md relative">
      <img src={posterPath} className="object-contain" />
      <p className="mt-2 text-center">
        {MetaData.name ? MetaData.name : MetaData.title}
      </p>

      <div className="absolute top-3 right-3">
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

export default SearchMovieCard;
