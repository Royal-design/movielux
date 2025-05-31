import { useMemo, useEffect, useState, useCallback } from "react";
import { useGetUpcomingQuery } from "@/redux/features/movieApi";
import { MediaWithTrailer } from "./MediaWithTrailer";
import { HeroSlide } from "./HeroSlide";
import useEmblaCarousel from "embla-carousel-react";
import { Spinner } from "./Spinner";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";

export const HeroSection = ({ onLoaded }: { onLoaded?: () => void }) => {
  const {
    data: upcomingMovies,
    isError,
    isLoading,
    error
  } = useGetUpcomingQuery({
    mediaType: "movie",
    page: 1
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const latestUpcomingMovies = useMemo(() => {
    return getRandomSubset(upcomingMovies?.results, 3);
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

  // Check if it's a network error
  const isNetworkError =
    isError && error && "status" in error && error.status === "FETCH_ERROR";

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isNetworkError)
    return (
      <div className="text-primary-red text-xl flex justify-center items-center h-dvh  md:h-screen md:text-3xl">
        <p>No network connection.</p>
      </div>
    );
  if (isError) return <div className="">Error fetching hero data.</div>;

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
