import {
  useGetDiscoverQuery,
  useGetGenresQuery
} from "@/redux/features/movieApi";
import type { MediaItemType } from "@/types/MediaType";
import React, { useState } from "react";
import { SkeletonCard } from "./SkeletonCard";

import { GenresSlide } from "./GenresSlide";
import { MediaWithTrailer } from "./MediaWithTrailer";
import { MediaCard } from "./MediaCard";

export const Trending: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { data: genresData } = useGetGenresQuery({
    mediaType: "movie"
  });

  const {
    data: moviesData,
    isError,
    isLoading,
    isFetching
  } = useGetDiscoverQuery({
    mediaType: "movie",
    page: 1,
    genres: selectedGenres,
    sortBy: "popularity.desc"
  });
  console.log(moviesData);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="text-white px-4 py-8  md:px-8 md:py-12">
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-bold">Trending Movies</h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>

      <GenresSlide
        genresData={genresData ?? { genres: [] }}
        selectedGenres={selectedGenres}
        toggleGenre={toggleGenre}
      />

      <div className="flex flex-wrap gap-2 mb-2"></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isFetching || isLoading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : moviesData?.results.map((media: MediaItemType) => (
              <div key={media.id} className="w-full h-full relative">
                <MediaWithTrailer media={media}>
                  {(movie, trailerKey) => (
                    <MediaCard media={movie} trailerKey={trailerKey} />
                  )}
                </MediaWithTrailer>
              </div>
            ))}
      </div>
      {isError && <div>Error fetching trending movies.</div>}
    </div>
  );
};
