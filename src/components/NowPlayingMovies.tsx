import { useGetNowPlayingQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import React, { useMemo } from "react";
import { SearchMovies } from "./SearchMovies";
import { MediaCard } from "./MediaCard";
import { MediaGrid } from "./MediaGrid";
import { SectionHeading } from "./SectionHeading";
import { NavLink } from "react-router-dom";

export const NowPlayingMovies: React.FC = () => {
  const { data: moviesData, isFetching, isLoading } = useGetNowPlayingQuery({
    mediaType: "movie",
    page: 1,
  });

  const movies = useMemo(
    () => getRandomSubset(moviesData?.results, 16),
    [moviesData?.results]
  );

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="In theaters"
        title="Now Playing Movies"
        description="Fresh from the cinema — search and discover what's on the big screen."
      />

      <SearchMovies />

      <div className="mt-12">
        {isFetching || isLoading ? (
          <MediaGrid loading skeletonCount={16} />
        ) : (
          <MediaGrid>
            {movies.map((movie) => (
              <NavLink key={movie.id} to={`/movies/movie/${movie.id}`}>
                <MediaCard media={movie} />
              </NavLink>
            ))}
          </MediaGrid>
        )}
      </div>
    </section>
  );
};
