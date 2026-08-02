import { useGetTopRatedQuery } from "@/redux/features/movieApi";
import { getMediaTitle } from "@/utilities/MediaUtilities";
import { NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const TvShowBanner: React.FC = () => {
  const { data: TvShowData } = useGetTopRatedQuery({
    mediaType: "tv",
    page: 1,
  });
  const n =
    TvShowData && TvShowData.results
      ? Math.floor(Math.random() * TvShowData.results.length)
      : 0;
  const tvShow = TvShowData?.results[n];

  if (!tvShow) return null;

  return (
    <NavLink
      to={`/series/${tvShow.id}`}
      className="group relative block h-[20rem] w-full overflow-hidden rounded-[1.75rem] border border-border shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift sm:h-[24rem]"
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`}
        alt={getMediaTitle(tvShow)}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
        <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          <span className="size-1.5 rounded-full bg-gold animate-pulse-soft" aria-hidden="true" />
          Editor's Pick
        </span>
        <h2 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">
          Our Top Rated TV Show
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70 line-clamp-3">
          Epic storytelling and unforgettable characters — the journey that
          has captivated audiences worldwide.
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
          View series
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </NavLink>
  );
};
