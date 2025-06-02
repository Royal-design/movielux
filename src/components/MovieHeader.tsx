import type { MovieDetailType } from "@/types/MovieDetailType";
import React from "react";

export const MovieHeader: React.FC<{ movie: MovieDetailType }> = ({
  movie
}) => {
  return (
    <div className="relative h-96 md:h-[500px]">
      <img
        loading="eager"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,1,9,0.3)] to-[rgba(18,1,9,0.8)]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold mb-2">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-xl md:text-2xl text-gray-300 italic">
              {movie.tagline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
