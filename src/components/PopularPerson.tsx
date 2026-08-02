import { useGetPopularPeopleQuery } from "@/redux/features/movieApi";
import React, { useMemo } from "react";
import { PeopleSlide } from "./PeopleSlide";
import { SectionHeading } from "./SectionHeading";
import { ErrorState } from "./ErrorState";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";

export const PopularPerson: React.FC = () => {
  const { data: peopleData, isError, isFetching, isLoading } =
    useGetPopularPeopleQuery({ page: 1 });

  const people = useMemo(() => {
    return getRandomSubset(peopleData?.results, 8);
  }, [peopleData?.results]);

  return (
    <section className="py-14 md:py-20">
      <SectionHeading
        eyebrow="Spotlight"
        title="Spotlight People"
        description="The actors and creators lighting up screens right now."
      />

      {isError ? (
        <ErrorState message="Error fetching people." />
      ) : isFetching || isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-2xl border border-border bg-surface skeleton-shimmer"
            />
          ))}
        </div>
      ) : (
        <PeopleSlide person={people} />
      )}
    </section>
  );
};
