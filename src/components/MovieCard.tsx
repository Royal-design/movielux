import type { Movie } from "@/types/MovieType";
import { useState } from "react";

type MovieCardProps = {
  movie: Movie;
  trailerKey?: string; // YouTube trailer key
};

export const MovieCard = ({ movie, trailerKey }: MovieCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-64 h-96 rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 bg-green-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && trailerKey ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
          title={movie.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 text-white text-sm">
        {movie.title}
      </div>
    </div>
  );
};
