import { useGetPopularPeopleQuery } from "@/redux/features/movieApi";
import React, { useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
import { PeopleSlide } from "./PeopleSlide";
import { getRandomSubset } from "@/utilities/gerRandomSubsets";

export const PopularPerson: React.FC = () => {
  const {
    data: peopleData,
    isError,
    isFetching,
    isLoading
  } = useGetPopularPeopleQuery({ page: 1 });

  const people = useMemo(() => {
    return getRandomSubset(peopleData?.results, 8);
  }, [peopleData?.results]);

  return (
    <div className="text-white px-4 pt-8  md:px-8 md:pt-12">
      <div className="flex flex-row items-end w-full mb-12">
        <h1 className="text-2xl md:text-3xl font-oswald font-bold">
          Spotlight People
        </h1>
        <div className="h-px flex-1 bg-primary/30 mb-1.5 ml-2"></div>
      </div>
      <div className="">
        {isFetching || isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <PeopleSlide person={people} />
          </>
        )}
        {isError && (
          <div className="text-primary-red">
            Error fetching trending movies.
          </div>
        )}
      </div>
    </div>
  );
};
