import { useGetVideosQuery } from "@/redux/features/movieApi";

export const useTrailer = (mediaType: string, id: number) => {
  const { data } = useGetVideosQuery({ mediaType, id });

  return data?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
};
