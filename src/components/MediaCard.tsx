import type { MediaItemType } from "@/types/MediaType";
import { getMediaTitle } from "@/utilities/MediaUtilities";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { IoIosHeart } from "react-icons/io";
import { IoPlaySharp, IoInformationCircle } from "react-icons/io5";

type MediaCardProps = {
  media: MediaItemType;
  trailerKey?: string;
};

export const MediaCard = ({ media, trailerKey }: MediaCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      className="relative w-full h-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px] border-none gap-0 px-0 py-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 bg-background group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="px-0 py-0 h-full flex flex-col relative">
        {hovered && trailerKey ? (
          <div className="flex-1 min-h-0 relative">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
              title={getMediaTitle(media)}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-t-2xl"
            ></iframe>

            {/* Trailer overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xs bg-red-600 px-2 py-1 rounded-full font-medium">
                    TRAILER
                  </span>
                  <IoInformationCircle className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Image Container with Advanced Effects */}
            <div className="flex-1 relative overflow-hidden rounded-t-2xl">
              {/* Loading placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-background/80 animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <img
                src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                alt={getMediaTitle(media)}
                className={`w-full md:h-[300px] object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Hover overlay with play button */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                {trailerKey ? (
                  <div className="bg-red-600 hover:bg-red-500 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                    <IoPlaySharp className="text-white w-6 h-6 ml-1" />
                  </div>
                ) : (
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <IoInformationCircle className="text-white w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Rating badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-sm font-medium">
                  {media.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Quality indicator */}
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold tracking-wide transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                HD
              </div>
            </div>

            {/* Enhanced Content Section */}
            <div className="p-4 bg-background relative">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-white font-bold text-sm sm:text-base mb-3 line-clamp-2 leading-tight group-hover:text-red-100 transition-colors duration-300">
                  {getMediaTitle(media)}
                </h3>

                <div className="flex justify-between items-center">
                  {/* Enhanced Vote Count */}
                  <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-3 py-1.5 group-hover:bg-gray-700/50 transition-colors duration-300">
                    <IoIosHeart className="text-red-500 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 text-xs sm:text-sm font-medium">
                      {media.vote_count > 1000
                        ? `${(media.vote_count / 1000).toFixed(1)}k`
                        : media.vote_count.toLocaleString()}
                    </span>
                  </div>

                  {/* Enhanced Rating */}
                  <div className="flex items-center bg-gray-800/50 rounded-full px-3 py-1.5 group-hover:bg-gray-700/50 transition-colors duration-300">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-sm mr-1">★</span>
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {media.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar for rating */}
                <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-yellow-400 rounded-full transition-all duration-1000 delay-300"
                    style={{
                      width: `${(media.vote_average / 10) * 100}%`,
                      transform: hovered ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left"
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Decorative border glow */}
        <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </CardContent>
    </Card>
  );
};
