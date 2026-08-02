import { useState, useEffect } from "react";
import { useSearchMediaQuery } from "@/redux/features/movieApi";
import { MediaCard } from "./MediaCard";
import { MediaGrid } from "./MediaGrid";
import { Pagination } from "./Pagination";
import { Input } from "./ui/input";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { Search, Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export const SearchMovies = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: movies, isLoading, isError, isFetching } = useSearchMediaQuery(
    { query: debouncedQuery, page, mediaType: "movie" },
    { skip: !debouncedQuery }
  );

  const handlePreviousPage = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () => setPage((prev) => prev + 1);

  return (
    <div className="space-y-8">
      <div className="relative max-w-xl">
        <Search
          className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-subtle"
          aria-hidden="true"
        />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search movies by title..."
          aria-label="Movie search input"
          className="h-12 rounded-2xl pl-11 pr-11"
        />
        {(isLoading || isFetching) && (
          <Loader2
            className="absolute right-4 top-1/2 size-4 -translate-y-1/2 animate-spin text-crimson"
            aria-hidden="true"
          />
        )}
      </div>

      {isError && (
        <ErrorState message="Something went wrong while searching." />
      )}

      {!isError && debouncedQuery && (
        <>
          {isLoading ? (
            <MediaGrid loading skeletonCount={8} />
          ) : movies && movies.results.length > 0 ? (
            <>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-subtle">
                {movies.total_results.toLocaleString()} results for "
                {debouncedQuery}"
              </p>
              <MediaGrid>
                {movies.results.map((movie) => (
                  <NavLink key={movie.id} to={`/movies/movie/${movie.id}`}>
                    <MediaCard media={movie} />
                  </NavLink>
                ))}
              </MediaGrid>
              <Pagination
                currentPage={page}
                totalPages={movies?.total_pages || 1}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
                isDisabled={isFetching}
              />
            </>
          ) : (
            <EmptyState
              title="No movies found"
              description="We couldn't find anything matching that title. Try a different search."
            />
          )}
        </>
      )}
    </div>
  );
};
