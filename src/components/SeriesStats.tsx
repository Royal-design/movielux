import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import { MediaStat } from "./MediaStat";
import { Star, Calendar, Tv, Layers, Globe } from "lucide-react";

export const SeriesStats: React.FC<{ series: TvDetailsResponse }> = ({
  series,
}) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2.5">
      <MediaStat
        icon={Star}
        label="Rating"
        tone="gold"
        value={`${series.vote_average.toFixed(1)} / 10`}
      />
      <MediaStat
        icon={Calendar}
        label="Since"
        value={new Date(series.first_air_date).getFullYear().toString()}
      />
      <MediaStat
        icon={Tv}
        label="Episodes"
        value={`${series.number_of_episodes}`}
      />
      <MediaStat
        icon={Layers}
        label="Seasons"
        value={`${series.number_of_seasons}`}
      />
      <MediaStat
        icon={Globe}
        label="Language"
        value={series.original_language.toUpperCase()}
      />
      <MediaStat
        icon={Star}
        label="Votes"
        value={series.vote_count.toLocaleString()}
      />
    </div>
  );
};
