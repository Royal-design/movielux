import { useMemo, useEffect, useState, useCallback } from "react";
import { useGetUpcomingQuery } from "@/redux/features/movieApi";
import { HeroSlide } from "./HeroSlide";
import useEmblaCarousel from "embla-carousel-react";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { Layout } from "@/layout/Layout";
import { PageLoader } from "./PageLoader";
import { ErrorState } from "./ErrorState";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";

export const HeroSection = ({ onLoaded }: { onLoaded?: () => void }) => {
  const {
    data: upcomingMovies,
    isError,
    isLoading,
    error,
  } = useGetUpcomingQuery({
    mediaType: "movie",
    page: 1,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const latestUpcomingMovies = useMemo(() => {
    return getRandomSubset(upcomingMovies?.results, 3);
  }, [upcomingMovies?.results]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    align: "start",
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

  // Gentle autoplay, paused while hovering or focused
  useEffect(() => {
    if (!emblaApi || paused) return;
    const id = setInterval(() => emblaApi.scrollNext(), 6500);
    return () => clearInterval(id);
  }, [emblaApi, paused]);

  useEffect(() => {
    if (upcomingMovies && !isLoading && !isError && onLoaded) {
      onLoaded();
    }
  }, [upcomingMovies, isLoading, isError, onLoaded]);

  const isNetworkError =
    isError && error && "status" in error && error.status === "FETCH_ERROR";

  if (isLoading)
    return <PageLoader label="Rolling the film" />;

  if (isNetworkError)
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <ErrorState
          title="No network connection"
          message="Check your internet and refresh to load the latest films."
          action={
            <Button onClick={() => window.location.reload()}>
              <RefreshCw aria-hidden="true" />
              Retry
            </Button>
          }
        />
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <ErrorState message="We couldn't load the hero content." />
      </div>
    );

  return (
    <section
      className="relative h-dvh w-full overflow-hidden text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div ref={emblaRef} className="h-full w-full overflow-hidden">
        <div className="flex h-full">
          {latestUpcomingMovies.map((movie) => (
            <div key={movie.id} className="relative h-full w-full flex-none">
              <HeroSlide media={movie} />
            </div>
          ))}
        </div>
      </div>

      {/* Ambient marquee glow */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 size-96 rounded-full bg-crimson/10 blur-3xl animate-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-16 size-80 rounded-full bg-gold/10 blur-3xl animate-glow"
        style={{ animationDelay: "2.5s" }}
        aria-hidden="true"
      />

      {/* Pagination */}
      <Layout className="relative">
        <div className="absolute bottom-8 left-4 z-10 flex items-center gap-3 sm:left-8">
          {latestUpcomingMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="group flex cursor-pointer items-center"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <span
                className={`font-mono text-sm font-bold transition-colors duration-300 ${
                  index === activeIndex
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                0{index + 1}
              </span>
              <span
                className="mx-2 h-px w-6 overflow-hidden bg-white/25"
                aria-hidden="true"
              >
                <span
                  className={`block h-full bg-marquee transition-all duration-700 ease-out ${
                    index === activeIndex ? "w-full" : "w-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </Layout>
    </section>
  );
};
