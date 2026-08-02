import { useState } from "react";
import { useTrailer } from "./useTrailer";
import { Play, X } from "lucide-react";

interface MediaTrailerSectionProps {
  mediaType: "movie" | "tv";
  id: number;
  title?: string;
}

export const MediaTrailerSection = ({
  mediaType,
  id,
  title,
}: MediaTrailerSectionProps) => {
  const trailer = useTrailer(mediaType, id);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!trailer) return null;

  const label = title ?? (mediaType === "movie" ? "movie" : "series");

  return (
    <div className="mb-10">
      <h3 className="mb-4 flex items-center gap-3 font-display text-xl font-bold text-foreground sm:text-2xl">
        <span className="h-6 w-1 rounded-full bg-marquee" aria-hidden="true" />
        Trailer
      </h3>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        {!isPlaying ? (
          <>
            <img
              src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
              alt={`${label} trailer thumbnail`}
              loading="lazy"
              className="size-full object-cover opacity-75"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = "1";
                  img.src = `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-background/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                aria-label={`Play ${label} trailer`}
                className="group relative flex size-16 cursor-pointer items-center justify-center rounded-full bg-marquee text-white shadow-glow transition-all duration-300 hover:scale-110"
              >
                <Play className="ml-1 size-7" aria-hidden="true" />
                <span className="absolute inset-0 rounded-full bg-marquee opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
              </button>
            </div>
          </>
        ) : (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
              title={`${label} Trailer`}
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setIsPlaying(false)}
              aria-label="Close trailer"
              className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
