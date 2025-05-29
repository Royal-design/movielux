import { useGetMovieVideosQuery } from "@/redux/features/movieApi";
import { MovieCard } from "./MovieCard";

export function MovieWithTrailer({ movie }: { movie: any }) {
  const { data: videoData } = useGetMovieVideosQuery(movie.id);
  const trailer = videoData?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );
  return <MovieCard movie={movie} trailerKey={trailer?.key} />;
}
