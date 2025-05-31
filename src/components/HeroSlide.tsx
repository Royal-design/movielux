import React, { useState } from "react";
import { Button } from "./ui/button";
import { RiPlayLargeFill } from "react-icons/ri";
import { formatDate } from "@/utilities/formateDate";
import type { MediaItemType } from "@/types/MediaType";
import { getMediaReleaseDate, getMediaTitle } from "@/utilities/MediaUtilities";

interface HeroSlideProps {
  media: MediaItemType;
  trailerKey?: string;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({ media, trailerKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (trailerKey) {
      setIsPlaying(true);
    } else {
      alert("No trailer available for this movie.");
    }
  };

  const handleCloseModal = () => {
    setIsPlaying(false);
  };

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
    <div className="relative h-full w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-6">
          {/* Rating and Date */}
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base md:text-lg">
            <span className="text-amber-300 font-rajdhani flex items-center">
              ★ {media.vote_average.toFixed(1)}
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
              onClick={handlePlayClick}
              disabled={!trailerKey}
              className="cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed w-full sm:w-auto px-6 py-3 rounded-xl hover:scale-105 duration-200 transition-all flex items-center justify-center gap-2"
            >
              <RiPlayLargeFill className="text-white w-5 h-5" />
              <span className="text-white font-semibold">
                {trailerKey ? "Play Trailer" : "No Trailer"}
              </span>
            </Button>

            <Button
              variant="ghost"
              className="border-2 border-white/30 hover:border-white/60 hover:bg-white/10 rounded-xl text-white px-6 py-3 font-semibold transition-all w-full sm:w-auto"
            >
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Play Trailer Modal */}
      {isPlaying && trailerKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${getMediaTitle(media)} - Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 sm:top-4 sm:right-4 text-white text-2xl font-bold bg-black/70 hover:bg-black/90 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              aria-label="Close trailer"
            >
              ✕
            </button>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
            Press ESC or click outside to close
          </div>
        </div>
      )}
    </div>
  );
};
