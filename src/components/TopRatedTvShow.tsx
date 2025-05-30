import React, { useMemo } from "react";
import { TvShowBanner } from "./TvShowBanner";
import { useGetTopRatedQuery } from "@/redux/features/movieApi";
import { TopRatedSlide } from "./TopRatedSlide";
import type { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

export const TopRatedTvShow: React.FC = () => {
  const { data: TvShowData } = useGetTopRatedQuery({
    mediaType: "tv",
    page: 1
  });

  const topRatedTvShow = useMemo(() => {
    if (!TvShowData?.results || TvShowData.results.length === 0) return [];
    const tvShow = [...TvShowData.results];
    // Shuffle the array randomly
    for (let i = tvShow.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tvShow[i], tvShow[j]] = [tvShow[j], tvShow[i]];
    }
    // Take top 8 shuffled
    return tvShow.slice(0, 8);
  }, [TvShowData?.results]);

  return (
    <div className="px-4 py-9 md:px-8 md:py-12 flex flex-col md:flex-row gap-8 w-full">
      <TvShowBanner />

      <div className="w-full">
        <TopRatedSlide slides={topRatedTvShow} options={OPTIONS} />
      </div>
    </div>
  );
};
