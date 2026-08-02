import { useGetTrendingQuery } from "@/redux/features/movieApi";
import React, { useMemo } from "react";
import { MediaCard } from "./MediaCard";
import { MediaGrid } from "./MediaGrid";
import { SectionHeading } from "./SectionHeading";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { NavLink } from "react-router-dom";

export const TrendingSeries: React.FC = () => {
  const { data: seriesData } = useGetTrendingQuery({
    mediaType: "tv",
    timeWindow: "day",
    page: 1,
  });

  const series = useMemo(
    () => getRandomSubset(seriesData?.results, 12),
    [seriesData?.results]
  );

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Binge worthy"
        title="Trending Series"
        description="The shows everyone's streaming right now."
      />
      <MediaGrid>
        {series.map((series) => (
          <NavLink key={series.id} to={`/series/${series.id}`}>
            <MediaCard media={series} />
          </NavLink>
        ))}
      </MediaGrid>
    </section>
  );
};
