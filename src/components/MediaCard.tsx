import type { MediaItemType } from "@/types/MediaType";
import { getMediaTitle } from "@/utilities/MediaUtilities";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { IoIosHeart } from "react-icons/io";

type MediaCardProps = {
  media: MediaItemType;
  trailerKey?: string;
};

export const MediaCard = ({ media, trailerKey }: MediaCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="relative w-full h-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px] border-none gap-0 px-0 py-0 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-background group"
      onMouseEnter={() => setHovered(false)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="px-0 py-0 h-full flex flex-col">
        {hovered && trailerKey ? (
          <div className="flex-1 min-h-0">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
              title={getMediaTitle(media)}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <>
            {/* Image Container */}
            <div className="flex-1 relative overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                alt={getMediaTitle(media)}
                className="w-full md:h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay for cards without trailers */}
              {!trailerKey && (
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 bg-background">
              <h3 className="text-white font-bold text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
                {getMediaTitle(media)}
              </h3>

              <div className="flex justify-between items-center">
                {/* Vote Count with Heart */}
                <div className="flex items-center gap-1">
                  <IoIosHeart className="text-red-500 w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-primary text-xs sm:text-sm font-medium">
                    {media.vote_count.toLocaleString()}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center">
                  <span className="text-primary text-xs sm:text-sm font-rajdhani">
                    ★
                  </span>
                  <span className="text-white text-xs sm:text-sm font-medium ml-1">
                    {media.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
