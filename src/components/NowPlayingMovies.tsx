import { useGetNowPlayingQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import React, { useMemo } from "react";
import { SearchMovies } from "./SearchMovies";
import { MediaCard } from "./MediaCard";
import { NavLink } from "react-router-dom";

export const NowPlayingMovies: React.FC = () => {
  const { data: moviesData } = useGetNowPlayingQuery({
    mediaType: "movie",
    page: 1
  });

  const movies = useMemo(
    () => getRandomSubset(moviesData?.results, 16),
    [moviesData?.results]
  );
  return (
    <div className="text-white px-4 py-8  md:px-8 md:py-12">
      {/* title */}
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          Now playing movies
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>
      {/* search */}
      <SearchMovies />
      {/*Now playing Movies */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {movies?.map((movie) => (
          <NavLink to={`/movies/movie/${movie.id}`}>
            <MediaCard key={movie.id} media={movie} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
