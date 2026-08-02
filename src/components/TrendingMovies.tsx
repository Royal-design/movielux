import { useGetTrendingQuery } from "@/redux/features/movieApi";
import React, { useMemo } from "react";
import { MediaCard } from "./MediaCard";
import { MediaGrid } from "./MediaGrid";
import { SectionHeading } from "./SectionHeading";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { NavLink } from "react-router-dom";

export const TrendingMovies: React.FC = () => {
  const { data: moviesData } = useGetTrendingQuery({
    mediaType: "movie",
    timeWindow: "day",
    page: 1,
  });

  const movies = useMemo(
    () => getRandomSubset(moviesData?.results, 8),
    [moviesData?.results]
  );

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Hot right now"
        title="Trending Movies"
        description="What the world is watching today."
      />
      <MediaGrid>
        {movies.map((movie) => (
          <NavLink key={movie.id} to={`/movies/movie/${movie.id}`}>
            <MediaCard media={movie} />
          </NavLink>
        ))}
      </MediaGrid>
    </section>
  );
};
