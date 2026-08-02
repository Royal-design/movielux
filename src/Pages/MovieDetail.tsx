import { MovieErrorMessage } from "@/components/MovieErrorMessage";
import { MovingLoadingSkeleton } from "@/components/MovingLoadingSkeleton";
import { useGetMovieDetailQuery } from "@/redux/features/movieApi";
import { useParams } from "react-router-dom";
import { MovieHeader } from "@/components/MovieHeader";
import { MovieStats } from "@/components/MovieStats";
import { GenreTags } from "@/components/GenreTags";
import { MovieTrailer } from "@/components/MovieTrailer";
import { BoxOffice } from "@/components/BoxOffice";
import { ProductionCompanies } from "@/components/ProductionCompanies";
import { MediaCredits } from "@/components/MediaCredits";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Layout } from "@/layout/Layout";
import { Rating } from "@/components/Rating";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useEffect } from "react";

export const MovieDetail = () => {
  const movieId = useParams().id;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieId]);

  const { data: movie, error, isLoading } = useGetMovieDetailQuery({
    id: movieId ?? "",
  });

  if (isLoading) return <MovingLoadingSkeleton />;

  if (error || !movie) {
    return <MovieErrorMessage message="Failed to load movie details" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MovieHeader movie={movie} />

      <Layout className="py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full object-cover"
                />
                <div className="absolute left-3 top-3">
                  <Rating value={movie.vote_average} size={46} />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4 pt-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                    {movie.vote_count.toLocaleString()} votes
                  </span>
                </div>
              </div>

              {movie.homepage && (
                <a
                  href={movie.homepage}
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

          {/* Details */}
          <div className="lg:col-span-2">
            <Reveal>
              <MovieStats movie={movie} />
              <GenreTags genres={movie.genres} />

              <div className="mb-8">
                <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-bold sm:text-2xl">
                  <span className="h-6 w-1 rounded-full bg-marquee" aria-hidden="true" />
                  Overview
                </h2>
                <p className="text-lg leading-relaxed text-muted">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              <MovieTrailer movieId={movie.id} />
              <BoxOffice budget={movie.budget} revenue={movie.revenue} />
              <MediaCredits media={movie} mediaType="movie" />
              <ProductionCompanies companies={movie.production_companies} />
            </Reveal>
          </div>
        </div>
      </Layout>

      <ScrollToTop />
    </div>
  );
};
