import type { Movie } from "@/types/MovieType";
import React, { useState } from "react";

interface HeroSlideProps {
  movie: Movie;
  trailerKey?: string; // <-- pass the trailerKey if you have it
}

export const HeroSlide: React.FC<HeroSlideProps> = ({ movie, trailerKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (trailerKey) {
      setIsPlaying(true);
    } else {
      alert("No trailer available for this movie.");
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Background Image */}
      <img
        src={`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay & Buttons */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end p-8 bg-background/40 z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">{movie.title}</h2>
          <p className="text-white text-lg leading-relaxed mb-6 font-light">
            {movie.overview}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handlePlayClick}
              className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              Play
            </button>
            <button className="bg-gray-600 bg-opacity-70 text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition-colors">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Play Trailer Modal */}
      {isPlaying && trailerKey && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              className="w-full h-full rounded shadow-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold bg-black/60 px-3 py-1 rounded-full hover:bg-black/80 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
