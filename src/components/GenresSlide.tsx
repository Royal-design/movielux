import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { GenreButton } from "./GenreButton";

interface GenreButtonProps {
  genresData: {
    genres: { id: number; name: string }[];
  };
  selectedGenres: number[];
  toggleGenre: (genreId: number) => void;
}

export const GenresSlide: React.FC<GenreButtonProps> = ({
  genresData,
  selectedGenres,
  toggleGenre
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
    align: "start",
    containScroll: "trimSnaps"
  });

  // Initialize both as false, let Embla determine the correct state
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

    // Set initial state immediately when Embla is ready
    const setInitialState = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    // Set initial state
    setInitialState();

    // Listen for changes
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", setInitialState); // Also listen for reInit

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", setInitialState);
    };
  }, [emblaApi, onSelect]);

  // Alternative: Set initial state based on genres length
  useEffect(() => {
    if (genresData?.genres && genresData.genres.length > 0) {
      // If we have genres and no emblaApi yet, assume next should be enabled
      if (!emblaApi) {
        setNextBtnEnabled(true);
      }
    }
  }, [genresData, emblaApi]);

  return (
    <div className="relative w-full mb-8">
      {/* Navigation buttons positioned absolutely at extreme ends */}
      <button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-8 h-8 rounded-full bg-black/50 text-white
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
          className="w-4 h-4"
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
          w-8 h-8 rounded-full bg-black/50 text-white
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
          className="w-4 h-4"
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
      <div className="overflow-hidden h-full mx-10 pr-1" ref={emblaRef}>
        {/* Embla container with uniform gaps */}
        <div className="flex h-full space-x-3">
          {genresData?.genres.map((genre) => (
            <div key={genre.id} className="flex-shrink-0">
              <GenreButton
                genreId={genre.id}
                genreName={genre.name}
                selectedGenres={selectedGenres}
                toggleGenre={toggleGenre}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
