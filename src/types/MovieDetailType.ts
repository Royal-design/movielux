import type { GenreType } from "./GenreType";

export interface MovieProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
}

export interface MovieDetailType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: GenreType[];
  production_companies: MovieProductionCompany[];
  original_language: string;
  budget: number;
  revenue: number;
  tagline?: string;
  homepage?: string;
}
