import { MediaTrailerSection } from "./MediaTrailerSection";

export const MovieTrailer: React.FC<{ movieId: number }> = ({ movieId }) => {
  return <MediaTrailerSection mediaType="movie" id={movieId} />;
};
