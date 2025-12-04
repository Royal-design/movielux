import React, { useMemo } from "react";
import { useGetUpcomingQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { UpcomingMoviesSlides } from "./UpcomingMoviesSlides";
import { Skeleton } from "./ui/skeleton";

export const UpcomingMovies: React.FC = () => {
  const {
    data: moviesData,
    isError,
    isLoading,
    isFetching,
  } = useGetUpcomingQuery({
    mediaType: "movie",
    page: 1,
  });

  const movies = useMemo(() => {
    return getRandomSubset(moviesData?.results, 8);
  }, [moviesData?.results]);

  return (
    <div className="text-white pt-8 md:pt-12">
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          Upcoming Movies
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>
      {isFetching || isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <UpcomingMoviesSlides movies={movies} />
      )}
      {isError && (
        <div className="text-primary-red">Error fetching trending movies.</div>
      )}
    </div>
  );
};
