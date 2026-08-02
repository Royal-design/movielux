import type { MediaItemType } from "@/types/MediaType";
import { getMediaReleaseDate, getMediaTitle } from "@/utilities/MediaUtilities";
import { useState } from "react";
import { Play, Info, X } from "lucide-react";
import { Rating } from "./Rating";
import { useTrailer } from "./useTrailer";
import { cn } from "@/lib/utils";

type MediaCardProps = {
  media: MediaItemType;
};

export const MediaCard = ({ media }: MediaCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const trailerKey = useTrailer("movie", media.id)?.key ?? "";
  const showTrailer = (hovered || isPlaying) && trailerKey;

  const handlePlayTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (trailerKey) setIsPlaying(true);
  };

  const handleStopTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
  };

  const title = getMediaTitle(media);
  const year = getMediaReleaseDate(media)?.slice(0, 4) ?? "";

  return (
    <article
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-crimson/30 hover:shadow-lift cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (isPlaying) setIsPlaying(false);
      }}
      aria-label={title}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {showTrailer ? (
          <div className="absolute inset-0 z-10">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
              title={`${title} - Trailer`}
              allow="autoplay; encrypted-media"
              loading="lazy"
              className="size-full"
            />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-crimson animate-pulse-soft" aria-hidden="true" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white">
                    Now playing
                  </span>
                </span>
                <button
                  onClick={handleStopTrailer}
                  aria-label={`Stop ${title} trailer`}
                  className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/80 backdrop-blur-md transition-colors duration-200 hover:bg-white/20 hover:text-white cursor-pointer"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              alt={title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
              <span className="rounded-full glass px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/90">
                {"title" in media ? "Film" : "Series"}
              </span>
              <Rating value={media.vote_average} size={40} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={handlePlayTrailer}
                disabled={!trailerKey}
                aria-label={
                  trailerKey ? `Play ${title} trailer` : "No trailer available"
                }
                className={cn(
                  "flex size-14 scale-50 items-center justify-center rounded-full bg-marquee text-white shadow-glow transition-transform duration-300 group-hover:scale-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                )}
              >
                {trailerKey ? (
                  <Play className="ml-0.5 size-6" aria-hidden="true" />
                ) : (
                  <Info className="size-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 z-20 p-3.5 sm:p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-base">
            {title}
          </h3>
          <div className="mt-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/60">
            {year && <span>{year}</span>}
            <span className="size-1 rounded-full bg-white/30" aria-hidden="true" />
            <span>
              {media.vote_count > 1000
                ? `${(media.vote_count / 1000).toFixed(1)}k`
                : media.vote_count.toLocaleString()}{" "}
              votes
            </span>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgb(228 58 69 / 0.35)" }}
        aria-hidden="true"
      />
    </article>
  );
};
