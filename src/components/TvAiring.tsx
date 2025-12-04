import { useGetOnTheAirQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { MediaCard } from "./MediaCard";

export const TvAiring: React.FC = () => {
  const { data: seriesData } = useGetOnTheAirQuery({ page: 1 });
  const series = useMemo(
    () => getRandomSubset(seriesData?.results, 12),
    [seriesData?.results]
  );

  return (
    <div className="text-white ">
      {/* title */}
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          On Air This Week
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>
      {/* series */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {series?.map((series) => (
          <NavLink key={series.id} to={`/series/${series.id}`}>
            <MediaCard media={series} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
