import { HeroSection } from "@/components/HeroSection";
import { MovieWithTrailer } from "@/components/MovieWithTrailer";
import { useGetPopularMoviesQuery } from "@/redux/features/movieApi";
import React, { useMemo } from "react";

export const Home: React.FC = () => {
  const { data, error, isLoading } = useGetPopularMoviesQuery(1);
  console.log(data);

  // Using useMemo to shuffle and select random movies
  const randomMovies = useMemo(() => {
    if (!data?.results || data.results.length === 0) return [];

    const moviesCopy = [...data.results];

    // Fisher-Yates shuffle algorithm
    for (let i = moviesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [moviesCopy[i], moviesCopy[j]] = [moviesCopy[j], moviesCopy[i]];
    }
    return moviesCopy.slice(0, 8);
  }, [data?.results]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data.</div>;

  return (
    <div className="">
      <HeroSection />
      <div className="flex flex-wrap gap-4 p-4">
        {randomMovies.map((movie) => (
          <MovieWithTrailer key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
