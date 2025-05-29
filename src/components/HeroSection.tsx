import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import {
  useGetUpcomingMoviesQuery,
  useGetMovieVideosQuery
} from "@/redux/features/movieApi";
import { useMemo } from "react";
import { HeroSlide } from "./HeroSlide";

export const HeroSection = () => {
  const {
    data: upcomingMovies,
    isError,
    isLoading
  } = useGetUpcomingMoviesQuery(1);

  // Random 3 movies
  const latestUpcomingMovies = useMemo(() => {
    if (!upcomingMovies?.results || upcomingMovies.results.length === 0)
      return [];

    const moviesCopy = [...upcomingMovies.results];

    // Shuffle using Fisher-Yates
    for (let i = moviesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [moviesCopy[i], moviesCopy[j]] = [moviesCopy[j], moviesCopy[i]];
    }
    return moviesCopy.slice(0, 3);
  }, [upcomingMovies?.results]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;

  return (
    <div className="">
      <Swiper
        autoplay={{ delay: 4000 }}
        navigation
        modules={[Navigation]}
        className="h-[500px] w-full text-white"
      >
        {latestUpcomingMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative">
            <MovieHeroSlideWithTrailer movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Separate component to fetch trailerKey for each movie
const MovieHeroSlideWithTrailer = ({ movie }: { movie: any }) => {
  const { data: videos } = useGetMovieVideosQuery(movie.id);

  // Find the first YouTube trailer
  const trailerKey = useMemo(() => {
    if (!videos?.results) return undefined;
    const trailer = videos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    return trailer?.key;
  }, [videos]);

  return <HeroSlide movie={movie} trailerKey={trailerKey} />;
};
