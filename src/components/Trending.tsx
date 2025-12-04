import {
  useGetDiscoverQuery,
  useGetGenresQuery,
} from "@/redux/features/movieApi";
import type { MediaItemType } from "@/types/MediaType";
import React, { useMemo, useState } from "react";
import { SkeletonCard } from "./SkeletonCard";

import { GenresSlide } from "./GenresSlide";
import { MediaCard } from "./MediaCard";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { NavLink } from "react-router-dom";

export const Trending: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { data: genresData } = useGetGenresQuery({
    mediaType: "movie",
  });

  const {
    data: moviesData,
    isError,
    isLoading,
    isFetching,
  } = useGetDiscoverQuery({
    mediaType: "movie",
    page: 1,
    genres: selectedGenres,
    sortBy: "popularity.desc",
  });

  const trendingMovies = useMemo(() => {
    return getRandomSubset(moviesData?.results, 8);
  }, [moviesData?.results]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="text-white ">
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          Trending Movies
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>

      <GenresSlide
        genresData={genresData ?? { genres: [] }}
        selectedGenres={selectedGenres}
        toggleGenre={toggleGenre}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {isFetching || isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : trendingMovies && trendingMovies.length > 0 ? (
          trendingMovies.map((media: MediaItemType) => (
            <div key={media.id} className="w-full h-full relative">
              <NavLink to={`/movies/movie/${media.id}`}>
                <MediaCard media={media} />
              </NavLink>
            </div>
          ))
        ) : (
          <p className="text-primary-red  w-full">Too much filtering</p>
        )}
      </div>
      {isError && <div>Error fetching trending movies.</div>}
    </div>
  );
};
