import { useGetTopRatedQuery } from "@/redux/features/movieApi";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { getMediaTitle } from "@/utilities/MediaUtilities";

export const TvShowBanner: React.FC = () => {
  const { data: TvShowData } = useGetTopRatedQuery({
    mediaType: "tv",
    page: 1
  });
  const n =
    TvShowData && TvShowData.results
      ? Math.floor(Math.random() * TvShowData.results.length)
      : 0;
  const tvShow = TvShowData?.results[n];
  console.log(tvShow);

  return (
    <div className="">
      {tvShow && (
        <Card className="p-0 gap-0 w-80 md:h-full rounded-none rounded-tr-3xl rounded-bl-3xl  overflow-hidden relative">
          <CardContent className="p-0 h-full">
            <img
              src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`}
              alt={getMediaTitle(tvShow)}
              className="inset-0 absolute w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 w-full h-full flex flex-col justify-center pt-16 px-8 md:p-8 bg-background/80 z-10">
              <div className="text-white max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Top Rated TV Show
                </h2>
                <p className="text-base md:text-lg text-gray-200">
                  Experience the thrill of our highest-rated series, where epic
                  storytelling and unforgettable characters come together. Join
                  the journey that has captivated audiences around the world!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
