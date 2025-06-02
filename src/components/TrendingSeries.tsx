import { useGetTrendingQuery } from "@/redux/features/movieApi";
import React, { useMemo } from "react";
import { MediaCard } from "./MediaCard";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { NavLink } from "react-router-dom";

export const TrendingSeries: React.FC = () => {
  const { data: seriesData } = useGetTrendingQuery({
    mediaType: "tv",
    timeWindow: "day",
    page: 1
  });

  const series = useMemo(
    () => getRandomSubset(seriesData?.results, 12),
    [seriesData?.results]
  );
  return (
    <div className="text-white px-4 py-8  md:px-8 md:py-12">
      {/* title */}
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          Trending series
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>
      {/* series */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {series?.map((series) => (
          <NavLink to={`/series/${series.id}`}>
            <MediaCard key={series.id} media={series} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
