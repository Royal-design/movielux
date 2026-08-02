import { GenreButton } from "./GenreButton";
import { Carousel } from "./Carousel";

interface GenresSlideProps {
  genresData: {
    genres: { id: number; name: string }[];
  };
  selectedGenres: number[];
  toggleGenre: (genreId: number) => void;
}

export const GenresSlide: React.FC<GenresSlideProps> = ({
  genresData,
  selectedGenres,
  toggleGenre,
}) => {
  const genres = genresData?.genres ?? [];

  return (
    <Carousel
      items={genres}
      keyOf={(genre) => genre.id}
      slideClassName="w-auto"
      className="mb-8"
      viewportClassName="py-1"
      renderItem={(genre) => (
        <GenreButton
          genreId={genre.id}
          genreName={genre.name}
          selectedGenres={selectedGenres}
          toggleGenre={toggleGenre}
        />
      )}
    />
  );
};
