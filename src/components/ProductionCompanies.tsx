import type { MovieProductionCompany } from "@/types/MovieDetailType";
import type { ProductionCompany } from "@/types/TvDetailsResponse";
import { Building2 } from "lucide-react";

export const ProductionCompanies: React.FC<{
  companies: MovieProductionCompany[] | ProductionCompany[];
}> = ({ companies }) => {
  if (!companies.length) return null;

  return (
    <div className="mb-10">
      <h3 className="mb-5 flex items-center gap-3 font-display text-xl font-bold text-foreground sm:text-2xl">
        <span className="h-6 w-1 rounded-full bg-marquee" aria-hidden="true" />
        Production Companies
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-4 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={`${company.name} logo`}
                loading="lazy"
                className="mx-auto h-10 max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-subtle">
                <Building2 className="size-5" aria-hidden="true" />
              </div>
            )}
            <p className="text-xs font-medium text-muted transition-colors duration-200 group-hover:text-foreground">
              {company.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
