import {
  useGetDiscoverQuery,
  useGetGenresQuery,
} from "@/redux/features/movieApi";
import type { MediaItemType } from "@/types/MediaType";
import { useMemo, useState } from "react";
import { GenresSlide } from "./GenresSlide";
import { MediaCard } from "./MediaCard";
import { MediaGrid } from "./MediaGrid";
import { SectionHeading } from "./SectionHeading";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { NavLink } from "react-router-dom";

export const Trending: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { data: genresData } = useGetGenresQuery({ mediaType: "movie" });

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
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Featured"
        title="Trending Movies"
        description="The films everyone's talking about, filtered by the genres you love."
      />

      <GenresSlide
        genresData={genresData ?? { genres: [] }}
        selectedGenres={selectedGenres}
        toggleGenre={toggleGenre}
      />

      {isError ? (
        <ErrorState message="Error fetching trending movies." />
      ) : isFetching || isLoading ? (
        <MediaGrid loading skeletonCount={8} />
      ) : trendingMovies.length > 0 ? (
        <MediaGrid>
          {trendingMovies.map((media: MediaItemType) => (
            <NavLink key={media.id} to={`/movies/movie/${media.id}`}>
              <MediaCard media={media} />
            </NavLink>
          ))}
        </MediaGrid>
      ) : (
        <EmptyState
          title="No films found"
          description="Try removing a genre filter to widen the search."
        />
      )}
    </section>
  );
};
