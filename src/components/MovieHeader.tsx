import type { MovieDetailType } from "@/types/MovieDetailType";
import { MediaBackdrop } from "./MediaBackdrop";

export const MovieHeader: React.FC<{ movie: MovieDetailType }> = ({
  movie,
}) => {
  return (
    <MediaBackdrop
      backdrop_path={movie.backdrop_path}
      title={movie.title}
      tagline={movie.tagline}
      backTo="/movies"
    />
  );
};
