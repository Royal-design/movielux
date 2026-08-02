import type { MovieDetailType } from "@/types/MovieDetailType";
import { MediaStat } from "./MediaStat";
import { Star, Calendar, Clock, Globe } from "lucide-react";

export const MovieStats: React.FC<{ movie: MovieDetailType }> = ({ movie }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2.5">
      <MediaStat
        icon={Star}
        label="Rating"
        tone="gold"
        value={`${movie.vote_average.toFixed(1)} / 10`}
      />
      <MediaStat
        icon={Calendar}
        label="Year"
        value={new Date(movie.release_date).getFullYear().toString()}
      />
      <MediaStat
        icon={Clock}
        label="Runtime"
        value={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
      />
      <MediaStat
        icon={Globe}
        label="Language"
        value={movie.original_language.toUpperCase()}
      />
      <MediaStat
        icon={Star}
        label="Votes"
        value={movie.vote_count.toLocaleString()}
      />
    </div>
  );
};
