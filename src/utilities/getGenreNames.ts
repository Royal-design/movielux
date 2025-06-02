import type { GenreResponseType } from "@/redux/features/movieApi";

export const getGenreNames = (
  genresValues: number[],
  genres: GenreResponseType
) => {
  if (!genres?.genres) return "";
  return genresValues
    .map((id) => genres.genres.find((g) => g.id === id)?.name)
    .filter((name): name is string => Boolean(name))
    .join(", ");
};
