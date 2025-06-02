import React, { useMemo } from "react";
import { useGetTrendingQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { SeriesHero } from "@/components/SeriesHero";
import { Spinner } from "@/components/Spinner";
import { SearchSeries } from "@/components/SearchSeries";
import { TrendingSeries } from "@/components/TrendingSeries";
import { TvAiring } from "@/components/TvAiring";
import { TopRatedSeries } from "@/components/TopRatedSeries";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const Series: React.FC = () => {
  const { data, isLoading } = useGetTrendingQuery({
    mediaType: "tv",
    timeWindow: "week",
    page: 1
  });

  const series = useMemo(
    () => getRandomSubset(data?.results, 12),
    [data?.results]
  );
  const featuredSeries = series[0];

  if (isLoading) return <Spinner />;

  return (
    <div className="">
      <SeriesHero tv={featuredSeries} />
      <SearchSeries />
      <TvAiring />
      <TopRatedSeries />
      <TrendingSeries />
      <Footer />
      <ScrollToTop />
    </div>
  );
};
