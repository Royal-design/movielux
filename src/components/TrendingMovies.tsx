import { useGetTrendingQuery } from "@/redux/features/movieApi";
import React, { useMemo } from "react";
import { MediaCard } from "./MediaCard";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";

export const TrendingMovies: React.FC = () => {
  const { data: moviesData } = useGetTrendingQuery({
    mediaType: "movie",
    timeWindow: "day",
    page: 1
  });

  const movies = useMemo(
    () => getRandomSubset(moviesData?.results, 8),
    [moviesData?.results]
  );
  return (
    <div className="text-white px-4 py-8  md:px-8 md:py-12">
      {/* title */}
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          Trending Movies
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>
      {/* movies */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {movies?.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
      {}
    </div>
  );
};
