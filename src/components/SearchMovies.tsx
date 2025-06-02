import { useState, useEffect } from "react";
import { useSearchMoviesQuery } from "@/redux/features/movieApi";
import { MediaCard } from "./MediaCard";
import { Pagination } from "./Pagination";
import { Spinner } from "./Spinner";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

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

  const {
    data: movies,
    isLoading,
    isError,
    isFetching,
    error
  } = useSearchMoviesQuery(
    { query: debouncedQuery, page },
    { skip: !debouncedQuery }
  );

  const handlePreviousPage = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () => setPage((prev) => prev + 1);

  return (
    <div className="space-y-6 text-white">
      {/* search movies */}
      <div className="relative">
        <Label className="sr-only">Search</Label>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search movies..."
          className="w-full max-w-sm px-4 py-2 rounded-lg border border-primary focus:ring-1 focus:ring-primary/50"
          aria-label="Movie search input"
        />
        {(isLoading || isFetching) && (
          <div className="absolute right-3 top-2.5">
            <Spinner />
          </div>
        )}
      </div>
      {/* Error */}
      {isError && (
        <div className="text-red-500 p-4 rounded bg-red-50">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to fetch movies"}
        </div>
      )}

      {/* Movies */}
      {!isError && debouncedQuery && (
        <>
          {movies && movies.results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movies?.results.map((movie) => (
                <MediaCard key={movie.id} media={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No movies found. Try a different search.
            </div>
          )}
          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={movies?.total_pages || 1}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            isDisabled={isFetching}
          />
        </>
      )}
    </div>
  );
};
