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
      className="relative w-full h-full md:h-82 border-none gap-0 px-0 py-0 rounded-none overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 bg-background"
      onMouseEnter={() => setHovered(false)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="px-0 py-0">
        {hovered && trailerKey ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
            title={getMediaTitle(media)}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="h-full">
            <img
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              alt={getMediaTitle(media)}
              className="w-full h-65 object-cover"
            />
            <div className="py-2 h-full">
              <p className="text-white font-bold text-sm">
                {getMediaTitle(media)}
              </p>
              <article className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <IoIosHeart className="text-primary-red size-3" />
                  <p className="text-primary text-sm">{media.vote_count}</p>
                </div>

                <div>
                  <p className="text-primary text-sm font-rajdhani">
                    ★ <span className="text-white">{media.vote_average}</span>
                  </p>
                </div>
              </article>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
