import type { University } from "@/utils/types";

import React, { useContext } from "react";

import { AppContext } from "@/app/providers";
import { cn } from "@/lib/utils";

export const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  isFavourite,
  university,
}) => {
  const { addToFavourites, removeFromFavourites } = useContext(AppContext);

  const handleClick = isFavourite ? removeFromFavourites : addToFavourites;

  return (
    <button
      className={cn("px-4 py-2 border-2 hover:text-white rounded ml-2", {
        "border-blue-500": !isFavourite,
        "border-red-500": isFavourite,

        "hover:bg-blue-500": !isFavourite,
        "hover:bg-red-500": isFavourite,

        "text-blue-500": !isFavourite,
        "text-red-500": isFavourite,
      })}
      onClick={() => handleClick(university)}
    >
      {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

type FavouriteButtonProps = {
  isFavourite: boolean;
  university: University;
};
