import { NavLink } from "react-router-dom";
import { MediaCard } from "./MediaCard";
import { Carousel } from "./Carousel";
import type { MediaItemType } from "@/types/MediaType";

interface MoviesProps {
  movies: MediaItemType[];
}

export const UpcomingMoviesSlides: React.FC<MoviesProps> = ({ movies }) => {
  return (
    <Carousel
      items={movies}
      keyOf={(movie) => movie.id}
      slideClassName="w-[9.5rem] sm:w-44 md:w-52"
      viewportClassName="py-1"
      renderItem={(movie) => (
        <NavLink to={`/movies/movie/${movie.id}`} className="block h-full">
          <MediaCard media={movie} />
        </NavLink>
      )}
    />
  );
};
