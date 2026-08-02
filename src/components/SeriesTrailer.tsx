import { MediaTrailerSection } from "./MediaTrailerSection";

export const SeriesTrailer: React.FC<{ seriesId: number }> = ({ seriesId }) => {
  return <MediaTrailerSection mediaType="tv" id={seriesId} />;
};
