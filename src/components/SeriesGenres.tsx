import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import React from "react";

export const SeriesGenres: React.FC<{ series: TvDetailsResponse }> = ({
  series
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {series.genres.map((genre) => (
        <span
          key={genre.id}
          className="px-3 py-1 bg-secondary/50 border border-secondary/80 text-purple-100 text-sm rounded-full hover:bg-secondary/60 duration-200 transition-colors"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};
