import { useGetOnTheAirQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { MediaCard } from "./MediaCard";
import { MediaGrid } from "./MediaGrid";
import { SectionHeading } from "./SectionHeading";

export const TvAiring: React.FC = () => {
  const { data: seriesData } = useGetOnTheAirQuery({ page: 1 });
  const series = useMemo(
    () => getRandomSubset(seriesData?.results, 12),
    [seriesData?.results]
  );

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Currently airing"
        title="On Air This Week"
        description="Fresh episodes landing right now."
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
