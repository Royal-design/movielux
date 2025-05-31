import type { MediaItemType } from "@/types/MediaType";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import { MediaWithTrailer } from "./MediaWithTrailer";
import { MediaCard } from "./MediaCard";

interface MoviesProps {
  movies: MediaItemType[];
}

export const UpcomingMoviesSlides: React.FC<MoviesProps> = ({ movies }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const setInitialState = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    setInitialState();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", setInitialState);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", setInitialState);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      if (!emblaApi) {
        setNextBtnEnabled(true);
      }
    }
  }, [movies, emblaApi]);

  return (
    <div className="relative w-full mb-4 sm:mb-8">
      {/* Navigation buttons positioned absolutely at extreme ends */}
      <button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className={`
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/50 text-white
            flex items-center justify-center
            transition-all duration-200
            ${
              prevBtnEnabled
                ? "opacity-100 hover:bg-black/70 cursor-pointer"
                : "opacity-30 cursor-not-allowed"
            }
          `}
        aria-label="Previous genres"
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className={`
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/50 text-white
            flex items-center justify-center
            transition-all duration-200
            ${
              nextBtnEnabled
                ? "opacity-100 hover:bg-black/70 cursor-pointer"
                : "opacity-30 cursor-not-allowed"
            }
          `}
        aria-label="Next genres"
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Embla viewport with padding to avoid navigation overlap */}
      <div className="overflow-hidden pr-1" ref={emblaRef}>
        {/* Embla container with responsive gaps and heights */}
        <div className="flex space-x-2 sm:space-x-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-42 sm:w-52 md:w-65">
              <div className="h-full">
                <MediaWithTrailer media={movie}>
                  {(movie, trailerKey) => (
                    <MediaCard media={movie} trailerKey={trailerKey} />
                  )}
                </MediaWithTrailer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
