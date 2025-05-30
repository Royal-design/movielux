import { useMemo, useEffect, useState, useCallback } from "react";
import { useGetUpcomingQuery } from "@/redux/features/movieApi";
import { MediaWithTrailer } from "./MediaWithTrailer";
import { HeroSlide } from "./HeroSlide";
import useEmblaCarousel from "embla-carousel-react";

export const HeroSection = ({ onLoaded }: { onLoaded?: () => void }) => {
  const {
    data: upcomingMovies,
    isError,
    isLoading
  } = useGetUpcomingQuery({
    mediaType: "movie",
    page: 1
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const latestUpcomingMovies = useMemo(() => {
    if (!upcomingMovies?.results || upcomingMovies.results.length === 0)
      return [];
    const moviesCopy = [...upcomingMovies.results];
    for (let i = moviesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [moviesCopy[i], moviesCopy[j]] = [moviesCopy[j], moviesCopy[i]];
    }
    return moviesCopy.slice(0, 3);
  }, [upcomingMovies?.results]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    align: "start"
  });

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (upcomingMovies && !isLoading && !isError && onLoaded) {
      onLoaded();
    }
  }, [upcomingMovies, isLoading, isError, onLoaded]);

  if (isLoading) return <div>Loading hero section...</div>;
  if (isError) return <div>Error fetching hero data.</div>;

  return (
    <div className="hero-section relative w-full h-dvh md:h-screen text-white">
      {/* Embla Viewport */}
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-dvh  md:h-screen">
          {latestUpcomingMovies.map((movie) => (
            <div key={movie.id} className="flex-none w-full h-full relative">
              <MediaWithTrailer media={movie}>
                {(movie, trailerKey) => (
                  <HeroSlide media={movie} trailerKey={trailerKey} />
                )}
              </MediaWithTrailer>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination with dynamic line styling */}
      <div className="absolute bottom-4 left-0 transform  flex items-center gap-4 px-8 font-rajdhani">
        {latestUpcomingMovies.map((_, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => scrollTo(index)}
              className={`text-xs font-bold transition-colors ${
                index === activeIndex ? "text-white" : "text-gray-400"
              }`}
            >
              0{index + 1}
            </button>
            {/* Line, dynamic opacity based on active index */}
            {index < latestUpcomingMovies.length - 1 && (
              <div
                className={`mx-2 w-8 h-px transition-all duration-300 ${
                  index < activeIndex
                    ? "bg-white opacity-100"
                    : "bg-white opacity-50"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
