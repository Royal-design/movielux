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

  return (
    <div className="relative h-full w-full">
      {/* Background Image */}
      <img
        src={`https://image.tmdb.org/t/p/original/${
          media.backdrop_path || media.poster_path
        }`}
        alt={getMediaTitle(media)}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay & Buttons */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center pt-16 px-8 md:p-8 bg-background/70 z-10">
        <div className="w-full md:max-w-2xl md:mt-16">
          <p className="text-primary text-lg  md:text-xl font-rajdhani mb-4">
            ★{" "}
            <span className="text-white text-lg">{media.vote_average} / </span>
            <span className="text-sm text-white">
              {formatDate(getMediaReleaseDate(media))}
            </span>
          </p>
          <h2 className="text-xl md:text-3xl font-inter font-bold text-white mb-9">
            {getMediaTitle(media)}
          </h2>
          <p className="text-white md:text-lg leading-relaxed mb-12 font-light">
            {media.overview}
          </p>
          <div className="flex gap-4 mb-4">
            <Button
              onClick={handlePlayClick}
              className="cursor-pointer bg-primary-red w-24 rounded-2xl hover:bg-primary-red/90 hover:scale-105 duration-200 transition-transform"
            >
              <RiPlayLargeFill className="text-white" />
            </Button>
            <Button
              variant="ghost"
              className="border border-primary hover:border-primary/80 rounded-2xl text-white px-6 py-2  font-semibold  transition-colors"
            >
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Play Trailer Modal */}
      {isPlaying && trailerKey && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              className="w-full h-full rounded shadow-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold bg-black/60 px-3 py-1 rounded-full hover:bg-black/80 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
