import React, { useState } from "react";
import { Button } from "./ui/button";
import { RiPlayLargeFill } from "react-icons/ri";
import { formatDate } from "@/utilities/formateDate";
import type { MediaItemType } from "@/types/MediaType";
import { getMediaReleaseDate, getMediaTitle } from "@/utilities/MediaUtilities";
import { NavLink } from "react-router-dom";
import { useTrailer } from "./useTrailer";
import { MediaTrailer } from "./MediaTrailer";
import { Layout } from "@/layout/Layout";

export const HeroSlide: React.FC<{ media: MediaItemType }> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const trailer = useTrailer("movie", media.id);
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isPlaying]);

  return (
    <div className="relative h-full w-full min-h-dvh md:h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            media.backdrop_path || media.poster_path
          }`}
          alt={getMediaTitle(media)}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/10"></div>
      </div>

      <Layout className="relative z-10 h-screen">
        {/* Content */}
        <div className="w-full flex h-full   flex-col justify-center">
          <div className="w-full max-w-4xl space-y-4 sm:space-y-6">
            {/* Rating and Date */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base md:text-lg">
              <span className="text-amber-300 font-rajdhani flex items-center">
                ★ {Number(media.vote_average).toFixed(1)}
              </span>
              <span className="text-white/80">•</span>
              <span className="text-white/80 text-sm sm:text-base">
                {formatDate(getMediaReleaseDate(media))}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cinzel font-bold text-white leading-tight max-w-4xl">
              {getMediaTitle(media)}
            </h1>

            {/* Overview */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-4 ">
              {media.overview}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button
                onClick={() => setIsPlaying(true)}
                disabled={!trailer?.key}
                className="cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed w-full sm:w-auto px-6 py-3 rounded-xl hover:scale-105 duration-200 transition-all flex items-center justify-center gap-2"
              >
                <RiPlayLargeFill className="text-white w-5 h-5" />
                <span className="text-white font-semibold">
                  {trailer?.key ? "Play Trailer" : "No Trailer"}
                </span>
              </Button>
              <NavLink to={`/movies/movie/${media.id}`}>
                <Button
                  variant="ghost"
                  className="border-2 border-white/30 hover:border-white/60 hover:bg-white/10 rounded-xl text-white px-6 py-3 font-semibold transition-all w-full sm:w-auto"
                >
                  More Info
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Play Trailer Modal */}
        {isPlaying && (
          <MediaTrailer
            media={media}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            trailerKey={trailer?.key ?? ""}
          />
        )}
      </Layout>
    </div>
  );
};
