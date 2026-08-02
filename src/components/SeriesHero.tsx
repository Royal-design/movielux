import type { MediaItemType } from "@/types/MediaType";
import { getMediaReleaseDate, getMediaTitle } from "@/utilities/MediaUtilities";
import { useState } from "react";
import { Button } from "./ui/button";
import { formatDate } from "@/utilities/formateDate";
import { getGenreNames } from "@/utilities/getGenreNames";
import { useGetGenresQuery } from "@/redux/features/movieApi";
import { Play, Info, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import { MediaTrailer } from "./MediaTrailer";
import { useTrailer } from "./useTrailer";
import { Layout } from "@/layout/Layout";

export const SeriesHero: React.FC<{ tv: MediaItemType }> = ({ tv }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { data: genres } = useGetGenresQuery({ mediaType: "tv" });
  const trailerKey = useTrailer("tv", tv.id)?.key ?? "";
  const genreList = genres
    ? getGenreNames(tv.genre_ids, genres).split(",").slice(0, 3)
    : [];

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          alt={getMediaTitle(tv)}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <Layout className="relative z-10 flex h-dvh flex-col justify-center md:h-screen">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          <div
            className="flex flex-wrap items-center gap-2.5 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5">
              <Star
                className="size-3.5 fill-gold text-gold"
                aria-hidden="true"
              />
              <span className="font-mono text-sm font-bold text-white">
                {tv.vote_average.toFixed(1)}
              </span>
            </span>
            {formatDate(getMediaReleaseDate(tv)) && (
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">
                {formatDate(getMediaReleaseDate(tv))}
              </span>
            )}
            {genreList.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-xs text-gold"
              >
                {genre.trim()}
              </span>
            ))}
          </div>

          <h1
            className="animate-fade-up font-display text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            style={{ animationDelay: "220ms" }}
          >
            {getMediaTitle(tv)}
          </h1>

          <p
            className="animate-fade-up line-clamp-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:line-clamp-4 sm:text-base md:text-lg"
            style={{ animationDelay: "320ms" }}
          >
            {tv.overview}
          </p>

          <div
            className="flex flex-col gap-3 pt-2 animate-fade-up sm:flex-row sm:gap-4"
            style={{ animationDelay: "420ms" }}
          >
            <Button
              size="lg"
              variant="gold"
              onClick={() => setIsPlaying(true)}
              disabled={!trailerKey}
              className="w-full sm:w-auto"
            >
              <Play className="ml-0.5" aria-hidden="true" />
              Play Trailer
            </Button>
            <NavLink to={`/series/${tv.id}`} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/25 text-white sm:w-auto"
              >
                <Info aria-hidden="true" />
                More Info
              </Button>
            </NavLink>
          </div>
        </div>
      </Layout>

      {isPlaying && (
        <MediaTrailer
          media={tv}
          trailerKey={trailerKey}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </section>
  );
};
