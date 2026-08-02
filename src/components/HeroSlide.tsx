import { useState } from "react";
import { Button } from "./ui/button";
import { Play, Info, Star } from "lucide-react";
import { formatDate } from "@/utilities/formateDate";
import type { MediaItemType } from "@/types/MediaType";
import {
  getMediaReleaseDate,
  getMediaTitle,
} from "@/utilities/MediaUtilities";
import { NavLink } from "react-router-dom";
import { useTrailer } from "./useTrailer";
import { MediaTrailer } from "./MediaTrailer";
import { Layout } from "@/layout/Layout";

export const HeroSlide: React.FC<{ media: MediaItemType }> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const trailer = useTrailer("movie", media.id);
  const title = getMediaTitle(media);
  const year = formatDate(getMediaReleaseDate(media));

  return (
    <div className="relative h-full w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original/${
            media.backdrop_path || media.poster_path
          }`}
          alt={title}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <Layout className="relative z-10 flex h-dvh flex-col justify-center md:h-screen">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          <div
            className="flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5">
              <Star
                className="size-3.5 fill-gold text-gold"
                aria-hidden="true"
              />
              <span className="font-mono text-sm font-bold text-white">
                {media.vote_average.toFixed(1)}
              </span>
            </span>
            {year && (
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">
                {year}
              </span>
            )}
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson">
              {"title" in media ? "Film" : "Series"}
            </span>
          </div>

          <h1
            className="animate-fade-up font-display text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            style={{ animationDelay: "220ms" }}
          >
            {title}
          </h1>

          <p
            className="animate-fade-up line-clamp-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:line-clamp-4 sm:text-base md:text-lg"
            style={{ animationDelay: "320ms" }}
          >
            {media.overview}
          </p>

          <div
            className="flex flex-col gap-3 pt-2 animate-fade-up sm:flex-row sm:gap-4"
            style={{ animationDelay: "420ms" }}
          >
            <Button
              size="lg"
              onClick={() => setIsPlaying(true)}
              disabled={!trailer?.key}
              className="w-full sm:w-auto"
            >
              <Play className="ml-0.5" aria-hidden="true" />
              {trailer?.key ? "Play Trailer" : "No Trailer"}
            </Button>
            <NavLink to={`/movies/movie/${media.id}`} className="w-full sm:w-auto">
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

      {isPlaying && trailer?.key && (
        <MediaTrailer
          media={media}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          trailerKey={trailer.key}
        />
      )}
    </div>
  );
};
