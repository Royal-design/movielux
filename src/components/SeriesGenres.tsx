import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import { GenreTags } from "./GenreTags";

export const SeriesGenres: React.FC<{ series: TvDetailsResponse }> = ({
  series,
}) => {
  return <GenreTags genres={series.genres} />;
};
