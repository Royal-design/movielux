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
    <div className="w-full max-w-sm  mx-auto">
      {tvShow && (
        <Card className="p-0 gap-0 w-full h-[400px] sm:h-[450px] border-primary/30 rounded-none rounded-tr-3xl rounded-bl-3xl overflow-hidden relative">
          <CardContent className="p-0 h-full relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`}
              alt={getMediaTitle(tvShow)}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 w-full h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 bg-background/80 z-10">
              <div className="text-white w-full">
                <h2 className="text-xl sm:text-2xl  md:text-3xl lg:text-4xl font-cinzel font-bold mb-3 sm:mb-4 leading-tight">
                  Our Top Rated TV Show
                </h2>
                <p className="text-lg md:text-xl font-normal text-gray-200 leading-relaxed">
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
