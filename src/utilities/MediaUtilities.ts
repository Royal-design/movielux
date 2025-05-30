import type { MediaItemType } from "@/types/MediaType";

export const getMediaTitle = (media: MediaItemType): string =>
  "title" in media ? media.title : media.name;

export const getMediaReleaseDate = (media: MediaItemType): string =>
  "release_date" in media ? media.release_date : media.first_air_date;

export const getMediaOriginalTitle = (media: MediaItemType): string =>
  "original_title" in media ? media.original_title : media.original_name;

export const getMediaOriginCountry = (media: MediaItemType): string[] =>
  "origin_country" in media ? media.origin_country : [];
