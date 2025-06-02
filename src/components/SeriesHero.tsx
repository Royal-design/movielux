import type { MediaItemType } from "@/types/MediaType";
import { getMediaReleaseDate, getMediaTitle } from "@/utilities/MediaUtilities";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { formatDate } from "@/utilities/formateDate";
import { getGenreNames } from "@/utilities/getGenreNames";
import { useGetGenresQuery } from "@/redux/features/movieApi";
import { RiPlayLargeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { MediaTrailer } from "./MediaTrailer";
import { useTrailer } from "./useTrailer";

export const SeriesHero: React.FC<{ tv: MediaItemType }> = ({ tv }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { data: genres } = useGetGenresQuery({ mediaType: "tv" });
  console.log(tv.genre_ids);

  const trailerKey = useTrailer("tv", tv.id)?.key ?? "";
  return (
    <div className="relative min-h-dvh md:min-h-screen w-full">
      {/* image */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          alt={getMediaTitle(tv)}
          className="h-full w-full object-cover"
        />
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/10"></div>
      </div>
      {/* content */}
      <div className="relative z-10 w-full flex flex-col justify-center h-dvh md:h-screen p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-6">
          {/* title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel font-bold text-white leading-tight max-w-4xl">
            {getMediaTitle(tv)}
          </h1>

          {/* rating, genre and year */}
          <div className="flex space-x-3 items-center">
            <span className="text-primary">★ {tv.vote_average.toFixed(1)}</span>
            <span>{formatDate(getMediaReleaseDate(tv))}</span>
            {genres &&
              getGenreNames(tv.genre_ids, genres)
                .split(",")
                .slice(0, 2)
                .map((genre) => (
                  <span className="rounded-md bg-primary/80 px-2 py-1 text-xs">
                    {genre}
                  </span>
                ))}
          </div>

          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-4 ">
            {tv.overview}
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 ">
            <Button
              onClick={() => setIsPlaying(true)}
              className="cursor-pointer bg-primary hover:bg-primary/70 disabled:bg-gray-600 disabled:cursor-not-allowed w-full sm:w-auto px-6 py-3 rounded-xl hover:scale-105 duration-200 transition-all flex items-center justify-center gap-2"
            >
              <RiPlayLargeFill className="text-white w-5 h-5" />
              <span className="text-white font-semibold">Play Trailer</span>
            </Button>
            <NavLink to={`/series/${tv.id}`}>
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
            media={tv}
            trailerKey={trailerKey}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </div>
    </div>
  );
};
