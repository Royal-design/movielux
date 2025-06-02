import { MoviesHero } from "@/components/MoviesHero";
import { useGetNowPlayingQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import React, { useMemo } from "react";

export const Movies: React.FC = () => {
  const {
    data: moviesData,
    isLoading,
    error
  } = useGetNowPlayingQuery({
    mediaType: "movie",
    page: 1
  });

  const movies = useMemo(
    () => getRandomSubset(moviesData?.results, 8),
    [moviesData?.results]
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error in fetching data</p>;

  return (
    <div>
      <MoviesHero movies={movies} />
    </div>
  );
};
