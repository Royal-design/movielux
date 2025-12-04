import { Footer } from "@/components/Footer";
import { MoviesHero } from "@/components/MoviesHero";
import { NowPlayingMovies } from "@/components/NowPlayingMovies";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Spinner } from "@/components/Spinner";
import { TrendingMovies } from "@/components/TrendingMovies";
import { Layout } from "@/layout/Layout";
import { useGetNowPlayingQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import React, { useMemo } from "react";

export const Movies: React.FC = () => {
  const {
    data: moviesData,
    isLoading,
    error,
  } = useGetNowPlayingQuery({
    mediaType: "movie",
    page: 1,
  });

  const movies = useMemo(
    () => getRandomSubset(moviesData?.results, 8),
    [moviesData?.results]
  );

  if (isLoading) return <Spinner />;
  if (error) return <p>Error in fetching data</p>;

  return (
    <div>
      <MoviesHero movies={movies} />
      <Layout>
        <NowPlayingMovies />
        <TrendingMovies />
      </Layout>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
