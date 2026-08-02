import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import { MediaBackdrop } from "@/components/MediaBackdrop";

export const SeriesHeader: React.FC<{ series: TvDetailsResponse }> = ({
  series,
}) => {
  return (
    <MediaBackdrop
      backdrop_path={series.backdrop_path}
      title={series.name}
      tagline={series.tagline}
      backTo="/series"
    />
  );
};
