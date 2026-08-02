import React, { useMemo } from "react";
import { useGetUpcomingQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { UpcomingMoviesSlides } from "./UpcomingMoviesSlides";
import { SectionHeading } from "./SectionHeading";
import { ErrorState } from "./ErrorState";

export const UpcomingMovies: React.FC = () => {
  const { data: moviesData, isError, isLoading, isFetching } =
    useGetUpcomingQuery({
      mediaType: "movie",
      page: 1,
    });

  const movies = useMemo(() => {
    return getRandomSubset(moviesData?.results, 8);
  }, [moviesData?.results]);

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="On the horizon"
        title="Upcoming Movies"
        description="Mark your calendar — the films about to light up the big screen."
      />

      {isError ? (
        <ErrorState message="Error fetching upcoming movies." />
      ) : isFetching || isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-2xl border border-border bg-surface skeleton-shimmer"
            />
          ))}
        </div>
      ) : (
        <UpcomingMoviesSlides movies={movies} />
      )}
    </section>
  );
};
