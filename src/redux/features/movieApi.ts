import type { Movie } from "@/types/MovieType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = import.meta.env.VITE_TMDB_API_TOKEN;

export interface MovieResposeType {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieVideo {
  id: number;
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }[];
}
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("accept", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieResposeType, number>({
      query: (page = 1) => `movie/popular?page=${page}`
    }),
    getTopRatedMovies: builder.query<MovieResposeType, number>({
      query: (page = 1) => `movie/top_rated?page=${page}`
    }),
    getNowPlayingMovies: builder.query<MovieResposeType, number>({
      query: (page = 1) => `movie/now_playing?page=${page}`
    }),
    getUpcomingMovies: builder.query<MovieResposeType, number>({
      query: (page = 1) => `movie/upcoming?page=${page}`
    }),
    getMovieVideos: builder.query<MovieVideo, number>({
      query: (movieId) => `movie/${movieId}/videos`
    })
  })
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetMovieVideosQuery
} = movieApi;
