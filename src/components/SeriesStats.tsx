import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import React from "react";
import { IoCalendar, IoEyeSharp, IoGlobe, IoStar } from "react-icons/io5";
import { BsLayers } from "react-icons/bs";

export const SeriesStats: React.FC<{ series: TvDetailsResponse }> = ({
  series
}) => {
  return (
    <div>
      <div className="flex flex-wrap gap-6 text-gray-200 mb-6">
        <div className="flex items-center gap-2">
          <IoStar className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-semibold text-white">
            {series.vote_average.toFixed(1)}
          </span>
          <span className="text-sm text-gray-300">
            ({series.vote_count.toLocaleString()} votes)
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-200">
          <IoCalendar className="w-5 h-5" />
          <span>{new Date(series.first_air_date).getFullYear()}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-200">
          <IoEyeSharp className="w-5 h-5" />
          <span>{series.number_of_episodes} episodes</span>
        </div>

        <div className="flex items-center gap-2 text-gray-200">
          <BsLayers className="w-5 h-5" />
          <span>{series.number_of_seasons} seasons</span>
        </div>

        <div className="flex items-center gap-2 text-gray-200">
          <IoGlobe className="w-5 h-5" />
          <span className="uppercase">{series.original_language}</span>
        </div>
      </div>
    </div>
  );
};
