import React, { useState } from "react";
import { useTrailer } from "./useTrailer";
import { Play, X } from "lucide-react";
import { Button } from "./ui/button";

export const SeriesTrailer: React.FC<{ seriesId: number }> = ({ seriesId }) => {
  const trailer = useTrailer("tv", seriesId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTrailer] = useState(true);

  if (!trailer || !showTrailer) return null;

  return (
    <div className="mb-8 relative group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white">Trailer</h3>
        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Close trailer"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900/50 border border-gray-700/30">
        {!isPlaying ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => setIsPlaying(true)}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all hover:scale-110"
                aria-label="Play trailer"
              >
                <Play className="w-8 h-8" />
              </Button>
            </div>
            <img
              src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
              alt="Trailer thumbnail"
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
            title="Movie Trailer"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};
