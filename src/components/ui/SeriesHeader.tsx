import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

export const SeriesHeader: React.FC<{ series: TvDetailsResponse }> = ({
  series
}) => {
  return (
    <div className="relative h-96 md:h-[500px]">
      {/* back */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/series"
          className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-white px-4 py-2 rounded-lg hover:bg-gray-800/60 transition-colors"
        >
          <MdOutlineKeyboardArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
          alt={series.name}
          className="h-full w-full object-cover"
        />
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,1,9,0.3)] to-[rgba(18,1,9,0.8)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold mb-2">
            {series.name}
          </h1>
          {series.tagline && (
            <p className="text-xl md:text-2xl text-gray-300 italic">
              {series.tagline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
