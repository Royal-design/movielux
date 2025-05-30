import React from "react";
import { Button } from "./ui/button";

interface GenreButtonProps {
  genreId: number;
  genreName: string;
  selectedGenres: number[];
  toggleGenre: (genreId: number) => void;
}

export const GenreButton: React.FC<GenreButtonProps> = ({
  genreId,
  genreName,
  selectedGenres,
  toggleGenre
}) => {
  return (
    <Button
      onClick={() => toggleGenre(genreId)}
      className={`px-3 py-1 h-6 text-xs text-white  text rounded-2xl border border-primary bg-background transition-colors duration-200 ${
        selectedGenres.includes(genreId) ? "bg-primary" : ""
      }`}
    >
      {genreName}
    </Button>
  );
};
