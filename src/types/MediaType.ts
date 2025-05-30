export interface BaseMediaItem {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  media_type?: string;
}

export interface MovieType extends BaseMediaItem {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface TvShowType extends BaseMediaItem {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export type MediaItemType = MovieType | TvShowType;
