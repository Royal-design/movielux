import { useGetCreditsQuery } from "@/redux/features/movieApi";
import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import React from "react";
import { PopularPersonCard } from "./PopularPersonCard";
import type { MovieDetailType } from "@/types/MovieDetailType";

export const MediaCredits: React.FC<{
  media: TvDetailsResponse | MovieDetailType;
  mediaType: "tv" | "movie";
}> = ({ media, mediaType }) => {
  const { data: credits } = useGetCreditsQuery({
    id: String(media.id),
    mediaType: mediaType
  });

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        {/* Casts */}
        <h1 className="text-2xl font-bold mb-4">Casts</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {credits?.cast.map((cast) => (
            <PopularPersonCard person={cast} key={cast.id} />
          ))}
        </div>
        {/* Crew  */}
        <h1 className="text-2xl font-bold mb-4">Crew Members</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {credits?.cast.map((cast) => (
            <PopularPersonCard person={cast} key={cast.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
