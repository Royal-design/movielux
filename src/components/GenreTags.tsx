import type { GenreType } from "@/types/GenreType";

export const GenreTags: React.FC<{ genres: GenreType[] }> = ({ genres }) => {
  if (!genres.length) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-xs font-medium text-gold transition-colors duration-200"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};
