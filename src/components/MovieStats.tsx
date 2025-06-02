import type { MovieDetailType } from "@/types/MovieDetailType";
import React from "react";
import { IoCalendar, IoGlobe, IoStar } from "react-icons/io5";
import { RiClockwise2Fill } from "react-icons/ri";

export const MovieStats: React.FC<{ movie: MovieDetailType }> = ({ movie }) => {
  return (
    <div className="flex flex-wrap gap-6 text-gray-200 mb-6">
      <div className="flex items-center gap-2">
        <IoStar className="w-5 h-5 text-yellow-400 fill-current" />
        <span className="font-semibold text-white">
          {movie.vote_average.toFixed(1)}
        </span>
        <span className="text-sm text-gray-300">
          ({movie.vote_count.toLocaleString()} votes)
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-200">
        <IoCalendar className="w-5 h-5" />
        <span>{new Date(movie.release_date).getFullYear()}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-200">
        <RiClockwise2Fill className="w-5 h-5" />
        <span>
          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-200">
        <IoGlobe className="w-5 h-5" />
        <span className="uppercase">{movie.original_language}</span>
      </div>
    </div>
  );
};
