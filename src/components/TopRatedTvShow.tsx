import React, { useMemo } from "react";
import { TvShowBanner } from "./TvShowBanner";
import { useGetTopRatedQuery } from "@/redux/features/movieApi";
import { TopRatedSlide } from "./TopRatedSlide";
import type { EmblaOptionsType } from "embla-carousel";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

export const TopRatedTvShow: React.FC = () => {
  const { data: TvShowData } = useGetTopRatedQuery({
    mediaType: "tv",
    page: 1
  });

  const topRatedTvShow = useMemo(() => {
    return getRandomSubset(TvShowData?.results, 8);
  }, [TvShowData?.results]);

  return (
    <div className="px-4 py-9 md:px-8 md:py-12 h-full  w-full">
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          Top Rated TV Show
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full h-full">
        <TvShowBanner />
        <div className="w-full">
          <TopRatedSlide slides={topRatedTvShow} options={OPTIONS} />
        </div>
      </div>
    </div>
  );
};
