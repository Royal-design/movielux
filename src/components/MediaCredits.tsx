import { useGetCreditsQuery } from "@/redux/features/movieApi";
import type { TvDetailsResponse } from "@/types/TvDetailsResponse";
import type { MovieDetailType } from "@/types/MovieDetailType";
import { PopularPersonCard } from "./PopularPersonCard";

export const MediaCredits: React.FC<{
  media: TvDetailsResponse | MovieDetailType;
  mediaType: "tv" | "movie";
}> = ({ media, mediaType }) => {
  const { data: credits, isLoading } = useGetCreditsQuery({
    id: String(media.id),
    mediaType,
  });

  const cast = credits?.cast ?? [];
  const crew = credits?.crew ?? [];

  if (isLoading) {
    return (
      <div className="mb-10 space-y-10">
        {[0, 1].map((block) => (
          <div key={block}>
            <div className="mb-5 h-7 w-40 skeleton-shimmer rounded-lg" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-2xl border border-border bg-surface skeleton-shimmer"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-10 space-y-10">
      {cast.length > 0 && (
        <section>
          <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-bold text-foreground sm:text-2xl">
            <span className="h-6 w-1 rounded-full bg-marquee" aria-hidden="true" />
            Cast
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {cast.map((member) => (
              <PopularPersonCard key={member.id} person={member} role={member.character} />
            ))}
          </div>
        </section>
      )}

      {crew.length > 0 && (
        <section>
          <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-bold text-foreground sm:text-2xl">
            <span className="h-6 w-1 rounded-full bg-marquee" aria-hidden="true" />
            Crew
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {crew.slice(0, 12).map((member) => (
              <PopularPersonCard key={member.credit_id ?? member.id} person={member} role={member.job} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
