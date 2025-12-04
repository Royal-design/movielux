import { MediaCredits } from "@/components/MediaCredits";
import { ProductionCompanies } from "@/components/ProductionCompanies";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SeriesGenres } from "@/components/SeriesGenres";
import { SeriesStats } from "@/components/SeriesStats";
import { SeriesTrailer } from "@/components/SeriesTrailer";
import { Spinner } from "@/components/Spinner";
import { SeriesHeader } from "@/components/ui/SeriesHeader";
import { Layout } from "@/layout/Layout";
import { useGetTVDetailsQuery } from "@/redux/features/movieApi";
import React, { useEffect } from "react";
import { IoGlobe } from "react-icons/io5";
import { useParams } from "react-router-dom";

export const SeriesDetail: React.FC = () => {
  const tvId = useParams().id;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tvId]);

  const {
    data: series,
    isLoading,
    error,
    isError,
  } = useGetTVDetailsQuery({ id: tvId ?? "" });

  const isNetworkError =
    isError && error && "status" in error && error.status === "FETCH_ERROR";

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isNetworkError)
    return (
      <div className="text-primary-red text-xl flex justify-center items-center h-dvh  md:h-screen md:text-3xl">
        <p>No network connection.</p>
      </div>
    );
  if (isError || !series)
    return <div className="">Error fetching hero data.</div>;

  return (
    <div>
      {/* header */}

      <SeriesHeader series={series} />
      {/* content */}
      <Layout>
        <div className="py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.name}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
            {/* details */}
            <div className="lg:col-span-2">
              <SeriesStats series={series} />
              <SeriesGenres series={series} />

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-200 text-lg leading-relaxed">
                  {series.overview || "No overview available."}
                </p>
              </div>

              {/* Trailer */}
              <SeriesTrailer seriesId={series.id} />

              {/* Credits */}
              {/* Credits */}
              <MediaCredits media={series} mediaType="tv" />

              {/* Production Company */}
              <ProductionCompanies companies={series.production_companies} />

              {/* External Links */}
              {series.homepage && (
                <div className="mb-8">
                  <a
                    href={series.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary/80 border border-primary/50 hover:bg-primary/50 text-white px-6 py-3 rounded-lg transition-colors backdrop-blur-sm"
                  >
                    <IoGlobe className="w-5 h-5" />
                    Official Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
      <ScrollToTop />
    </div>
  );
};
