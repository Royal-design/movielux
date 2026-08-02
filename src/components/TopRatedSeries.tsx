import { useGetTopRatedQuery } from "@/redux/features/movieApi";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { MediaCard } from "./MediaCard";
import { MediaGrid } from "./MediaGrid";
import { SectionHeading } from "./SectionHeading";

export const TopRatedSeries = () => {
  const { data: seriesData } = useGetTopRatedQuery({
    page: 1,
    mediaType: "tv",
  });

  const series = useMemo(
    () => getRandomSubset(seriesData?.results, 12),
    [seriesData?.results]
  );

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Critically acclaimed"
        title="Top Rated Series"
        description="The highest-rated shows, measured by real audience votes."
      />
      <MediaGrid>
        {series
          ?.filter((s) => s.vote_count > 200)
          .map((series) => (
            <NavLink key={series.id} to={`/series/${series.id}`}>
              <MediaCard media={series} />
            </NavLink>
          ))}
      </MediaGrid>
    </section>
  );
};
