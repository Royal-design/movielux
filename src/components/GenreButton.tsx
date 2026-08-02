import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface GenreButtonProps {
  genreId: number;
  genreName: string;
  selectedGenres: number[];
  toggleGenre: (genreId: number) => void;
}

export const GenreButton: React.FC<GenreButtonProps> = ({
  genreId,
  genreName,
  selectedGenres,
  toggleGenre,
}) => {
  const active = selectedGenres.includes(genreId);
  return (
    <Button
      type="button"
      onClick={() => toggleGenre(genreId)}
      aria-pressed={active}
      className={cn(
        "h-9 cursor-pointer rounded-full px-4 text-xs font-semibold transition-all duration-300",
        active
          ? "bg-marquee text-white shadow-glow"
          : "border border-border-strong bg-white/[0.03] text-muted hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
      )}
    >
      {genreName}
    </Button>
  );
};
