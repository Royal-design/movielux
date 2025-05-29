import { useGetMovieVideosQuery } from "@/redux/features/movieApi";
import { useMemo } from "react";

interface MovieWithTrailerProps {
  movie: any;
  children: (movie: any, trailerKey: string | undefined) => React.ReactNode;
}

export const MovieWithTrailer: React.FC<MovieWithTrailerProps> = ({
  movie,
  children
}) => {
  const { data: videos } = useGetMovieVideosQuery(movie.id);

  const trailerKey = useMemo(() => {
    if (!videos?.results) return undefined;
    const trailer = videos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    return trailer?.key;
  }, [videos]);

  return <>{children(movie, trailerKey)}</>;
};
