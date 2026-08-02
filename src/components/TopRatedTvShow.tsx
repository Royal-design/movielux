import React, { useMemo } from "react";
import { TvShowBanner } from "./TvShowBanner";
import { useGetTopRatedQuery } from "@/redux/features/movieApi";
import { TopRatedSlide } from "./TopRatedSlide";
import type { EmblaOptionsType } from "embla-carousel";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { SectionHeading } from "./SectionHeading";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

export const TopRatedTvShow: React.FC = () => {
  const { data: TvShowData } = useGetTopRatedQuery({
    mediaType: "tv",
    page: 1,
  });

  const topRatedTvShow = useMemo(() => {
    return getRandomSubset(TvShowData?.results, 8);
  }, [TvShowData?.results]);

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Curated"
        title="Top Rated TV Shows"
        description="The series critics and audiences agree on — binge-worthy from episode one."
      />

      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        <div className="w-full md:max-w-sm lg:max-w-xs">
          <TvShowBanner />
        </div>
        <div className="w-full">
          <TopRatedSlide slides={topRatedTvShow} options={OPTIONS} />
        </div>
      </div>
    </section>
  );
};
