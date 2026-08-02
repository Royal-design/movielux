import type { CastMember, CrewMember } from "@/types/CreditsType";
import type { PersonType } from "@/types/PersonType";
import { User } from "lucide-react";

interface PersonProps {
  person: CastMember | CrewMember | PersonType;
  role?: string;
}

export const PopularPersonCard: React.FC<PersonProps> = ({ person, role }) => {
  return (
    <article
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-crimson/30 hover:shadow-lift"
      aria-label={person.name}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w400${person.profile_path}`}
            alt={person.name}
            loading="lazy"
            className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface-raised to-surface text-subtle">
            <User className="size-14" aria-hidden="true" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        <div className="absolute right-3 top-3">
          <span className="rounded-full glass px-2.5 py-1 font-mono text-[10px] font-semibold text-white">
            ★ {person.popularity.toFixed(1)}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
          <h3 className="font-semibold leading-snug text-white line-clamp-1">
            {person.name}
          </h3>
          <p className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/60">
            <span className="text-gold">{person.known_for_department}</span>
            {role && (
              <>
                <span
                  className="size-1 rounded-full bg-white/30"
                  aria-hidden="true"
                />
                <span className="line-clamp-1 normal-case tracking-normal text-white/70">
                  {role}
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px rgb(228 58 69 / 0.35)" }}
        aria-hidden="true"
      />
    </article>
  );
};
