import { MovieErrorMessage } from "@/components/MovieErrorMessage";
import { MovingLoadingSkeleton } from "@/components/MovingLoadingSkeleton";
import { useGetMovieDetailQuery } from "@/redux/features/movieApi";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MovieHeader } from "@/components/MovieHeader";
import { MovieStats } from "@/components/MovieStats";
import { GenreTags } from "@/components/GenreTags";
import { MovieTrailer } from "@/components/MovieTrailer";
import { BoxOffice } from "@/components/BoxOffice";
import { ProductionCompanies } from "@/components/ProductionCompanies";
import { IoGlobe } from "react-icons/io5";
import { useEffect } from "react";

export const MovieDetail = () => {
  const movieId = useParams().id;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieId]);

  const {
    data: movie,
    error,
    isLoading
  } = useGetMovieDetailQuery({
    id: movieId ?? ""
  });

  if (isLoading) return <MovingLoadingSkeleton />;

  if (error || !movie) {
    return <MovieErrorMessage message="Failed to load movie details" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-white px-4 py-2 rounded-lg hover:bg-gray-800/60 transition-colors"
        >
          <MdOutlineKeyboardArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Movie Header */}
      <MovieHeader movie={movie} />

      {/* Movie Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2">
            <MovieStats movie={movie} />
            <GenreTags genres={movie.genres} />

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>

            {/* Trailer */}
            <MovieTrailer movieId={movie.id} />

            {/* Box Office */}
            <BoxOffice budget={movie.budget} revenue={movie.revenue} />

            {/* Production Companies */}
            <ProductionCompanies companies={movie.production_companies} />

            {/* External Links */}
            {movie.homepage && (
              <div className="mb-8">
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-700/50 border border-purple-600/50 hover:bg-purple-600/50 text-white px-6 py-3 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <IoGlobe className="w-5 h-5" />
                  Official Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
