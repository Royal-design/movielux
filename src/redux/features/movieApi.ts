import type { CreditsResponse } from "@/types/CreditsType";
import type { GenreType } from "@/types/GenreType";
import type { MediaItemType } from "@/types/MediaType";
import type { MovieDetailType } from "@/types/MovieDetailType";
import type { PersonType } from "@/types/PersonType";
import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = import.meta.env.VITE_TMDB_API_TOKEN;

export interface MediaResponseType {
  page: number;
  results: MediaItemType[];
  total_pages: number;
  total_results: number;
}

export interface MediaVideoType {
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
export interface PersonResponseType {
  page: number;
  results: PersonType[];
  total_pages: number;
  total_results: number;
}

export interface GenreResponseType {
  genres: GenreType[];
}

export interface DiscoverQueryParams {
  mediaType: string;
  page?: number;
  genres?: number[];
  releaseDateGte?: string;
  releaseDateLte?: string;
  language?: string;
  sortBy?: string;
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
    getPopular: builder.query<
      MediaResponseType,
      { mediaType: string; page?: number }
    >({
      query: ({ mediaType, page = 1 }) => `${mediaType}/popular?page=${page}`
    }),
    getTopRated: builder.query<
      MediaResponseType,
      { mediaType: string; page?: number }
    >({
      query: ({ mediaType, page = 1 }) => `${mediaType}/top_rated?page=${page}`
    }),
    getNowPlaying: builder.query<
      MediaResponseType,
      { mediaType: string; page?: number }
    >({
      query: ({ mediaType, page = 1 }) =>
        `${mediaType}/now_playing?page=${page}`
    }),
    getUpcoming: builder.query<
      MediaResponseType,
      { mediaType: string; page?: number }
    >({
      query: ({ mediaType, page = 1 }) => `${mediaType}/upcoming?page=${page}`
    }),
    getVideos: builder.query<MediaVideoType, { mediaType: string; id: number }>(
      {
        query: ({ mediaType, id }) => `${mediaType}/${id}/videos`
      }
    ),
    getMovieDetail: builder.query<MovieDetailType, { id: string }>({
      query: ({ id }) => `movie/${id}`
    }),
    getGenres: builder.query<GenreResponseType, { mediaType: string }>({
      query: ({ mediaType }) => `genre/${mediaType}/list`
    }),
    getPopularPeople: builder.query<PersonResponseType, { page?: number }>({
      query: ({ page = 1 }) => `person/popular?page=${page}`
    }),

    getTrending: builder.query<
      MediaResponseType,
      { mediaType: string; timeWindow: string; page?: number }
    >({
      query: ({ mediaType, timeWindow, page = 1 }) =>
        `trending/${mediaType}/${timeWindow}?page=${page}`
    }),
    searchMedia: builder.query<
      MediaResponseType,
      {
        query: string;
        page?: number;
        includeAdult?: boolean;
        mediaType: string;
      }
    >({
      query: ({ query, page = 1, includeAdult = false, mediaType }) => ({
        url: `search/${mediaType}`,
        params: {
          query,
          page,
          include_adult: includeAdult
        }
      })
    }),
    getDiscover: builder.query<MediaResponseType, DiscoverQueryParams>({
      query: ({
        mediaType,
        page = 1,
        genres = [],
        releaseDateGte,
        releaseDateLte,
        language,
        sortBy = "popularity.desc"
      }) => {
        let queryStr = `discover/${mediaType}?page=${page}&sort_by=${sortBy}`;
        if (genres.length) {
          queryStr += `&with_genres=${genres.join(",")}`;
        }
        if (releaseDateGte) {
          queryStr += `&primary_release_date.gte=${releaseDateGte}`;
        }
        if (releaseDateLte) {
          queryStr += `&primary_release_date.lte=${releaseDateLte}`;
        }
        if (language) {
          queryStr += `&with_original_language=${language}`;
        }
        return queryStr;
      }
    }),
    getOnTheAir: builder.query<MediaResponseType, { page?: number }>({
      query: ({ page = 1 }) => `tv/on_the_air?page=${page}`
    }),
    getTVDetails: builder.query<TvDetailsResponse, { id: string }>({
      query: ({ id }) => `tv/${id}`
    }),
    getCredits: builder.query<
      CreditsResponse,
      { id: string; mediaType: "tv" | "movie" }
    >({
      query: ({ id, mediaType }) => `${mediaType}/${id}/credits`
    })
  })
});

export const {
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetNowPlayingQuery,
  useGetUpcomingQuery,
  useGetVideosQuery,
  useGetGenresQuery,
  useGetDiscoverQuery,
  useGetTrendingQuery,
  useGetPopularPeopleQuery,
  useGetMovieDetailQuery,
  useSearchMediaQuery,
  useGetOnTheAirQuery,
  useGetTVDetailsQuery,
  useGetCreditsQuery
} = movieApi;
