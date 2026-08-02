import { MediaCredits } from "@/components/MediaCredits";
import { ProductionCompanies } from "@/components/ProductionCompanies";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SeriesGenres } from "@/components/SeriesGenres";
import { SeriesStats } from "@/components/SeriesStats";
import { SeriesTrailer } from "@/components/SeriesTrailer";
import { SeriesHeader } from "@/components/ui/SeriesHeader";
import { Layout } from "@/layout/Layout";
import { useGetTVDetailsQuery } from "@/redux/features/movieApi";
import { Rating } from "@/components/Rating";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const SeriesDetail: React.FC = () => {
  const tvId = useParams().id;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tvId]);

  const { data: series, isLoading, error, isError } = useGetTVDetailsQuery({
    id: tvId ?? "",
  });

  const isNetworkError =
    isError && error && "status" in error && error.status === "FETCH_ERROR";

  if (isLoading)
    return (
      <div className="min-h-dvh">
        <div className="relative h-[40vh] w-full skeleton-shimmer" />
        <Layout className="py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="aspect-[2/3] w-full rounded-2xl border border-border skeleton-shimmer lg:col-span-1" />
            <div className="space-y-4 lg:col-span-2">
              <div className="h-10 w-3/4 skeleton-shimmer rounded-xl" />
              <div className="h-4 w-1/2 skeleton-shimmer rounded-lg" />
              <div className="h-4 w-full skeleton-shimmer rounded-lg" />
            </div>
          </div>
        </Layout>
      </div>
    );
  if (isNetworkError)
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-xl text-crimson md:text-3xl">
          No network connection.
        </p>
      </div>
    );
  if (isError || !series)
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-muted">Error fetching series data.</p>
      </div>
    );

  return (
    <div>
      <SeriesHeader series={series} />

      <Layout className="py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.name}
                  className="w-full object-cover"
                />
                <div className="absolute left-3 top-3">
                  <Rating value={series.vote_average} size={46} />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4 pt-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                    {series.vote_count.toLocaleString()} votes
                  </span>
                </div>
              </div>

              {series.homepage && (
                <a
                  href={series.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block"
                >
                  <Button variant="outline" className="w-full">
                    <Globe aria-hidden="true" />
                    Official Website
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Reveal>
              <SeriesStats series={series} />
              <SeriesGenres series={series} />

              <div className="mb-8">
                <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-bold sm:text-2xl">
                  <span className="h-6 w-1 rounded-full bg-marquee" aria-hidden="true" />
                  Overview
                </h2>
                <p className="text-lg leading-relaxed text-muted">
                  {series.overview || "No overview available."}
                </p>
              </div>

              <SeriesTrailer seriesId={series.id} />
              <MediaCredits media={series} mediaType="tv" />
              <ProductionCompanies companies={series.production_companies} />
            </Reveal>
          </div>
        </div>
      </Layout>

      <ScrollToTop />
    </div>
  );
};
