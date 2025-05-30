import { useGetVideosQuery } from "@/redux/features/movieApi";
import type { MediaItemType } from "@/types/MediaType";
import React, { useMemo } from "react";

interface MediaWithTrailerProps {
  media: MediaItemType;
  children: (movie: any, trailerKey: string | undefined) => React.ReactNode;
}

export const MediaWithTrailer: React.FC<MediaWithTrailerProps> = ({
  media,
  children
}) => {
  const { data: videos } = useGetVideosQuery({
    id: media.id,
    mediaType: media.media_type ?? "movie"
  });

  const trailerKey = useMemo(() => {
    if (!videos?.results) return undefined;
    const trailer = videos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    return trailer?.key;
  }, [videos]);

  return <>{children(media, trailerKey)}</>;
};
