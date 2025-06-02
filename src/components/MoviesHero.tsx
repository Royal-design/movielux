import type { MediaItemType } from "@/types/MediaType";
import { getMediaTitle } from "@/utilities/MediaUtilities";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { getGenreNames } from "@/utilities/getGenreNames";
import { useGetGenresQuery } from "@/redux/features/movieApi";
import { RiPlayLargeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { MediaTrailer } from "./MediaTrailer";
import { useTrailer } from "./useTrailer";

export const MoviesHero: React.FC<{ movies: MediaItemType[] }> = ({
  movies
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { data: genres } = useGetGenresQuery({ mediaType: "movie" });
  const movie = movies[0];
  const trailerKey = useTrailer("movie", movie.id)?.key ?? "";

  return (
    <div className="relative h-full w-full min-h-dvh md:min-h-screen">
      {/*bacground image */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={getMediaTitle(movie)}
          className="w-full h-full object-cover"
        />
        {/* overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/60"></div>
      </div>

      {/* content */}
      <div className="relative z-10 w-full flex flex-col  justify-end h-screen p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-6">
          {/*taing and genres */}
          <div className="flex space-x-3 items-center mb-12">
            <Button className="rounded-3xl bg-primary px-2 h-7  hover:bg-primary/90 transition-colors">
              <span>★</span>{" "}
              <span className="text-sm">{movie.vote_average}</span>
            </Button>
            <span className="text-white/80">•</span>

            <p className="text-white/80 text-sm">
              {genres
                ? getGenreNames(movie.genre_ids, genres).split(",").join(" / ")
                : ""}
            </p>
          </div>
          {/* title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel font-bold text-white leading-tight max-w-4xl">
            {getMediaTitle(movie)}
          </h1>
          {/* heading */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-4 ">
            {movie.overview}
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 ">
            <Button
              onClick={() => setIsPlaying(true)}
              className="cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed w-full sm:w-auto px-6 py-3 rounded-xl hover:scale-105 duration-200 transition-all flex items-center justify-center gap-2"
            >
              <RiPlayLargeFill className="text-white w-5 h-5" />
              <span className="text-white font-semibold">Play Trailer</span>
            </Button>
            <NavLink to={`/movies/movie/${movie.id}`}>
              <Button
                variant="ghost"
                className="border-2 border-white/30 hover:border-white/60 hover:bg-white/10 rounded-xl text-white px-6 py-3 font-semibold transition-all w-full sm:w-auto"
              >
                More Info
              </Button>
            </NavLink>
          </div>
        </div>
        {isPlaying && (
          <MediaTrailer
            media={movie}
            trailerKey={trailerKey}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </div>
    </div>
  );
};
