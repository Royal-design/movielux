// import type { ProductionCompany } from "@/types/MovieDetailType";
import type { MovieProductionCompany } from "@/types/MovieDetailType";
import type { ProductionCompany } from "@/types/TvDetailsResponse";
import React from "react";

export const ProductionCompanies: React.FC<{
  companies: MovieProductionCompany[] | ProductionCompany[];
}> = ({ companies }) => {
  if (!companies.length) return null;

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-4">
        Production Companies
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-gray-900/40 border border-gray-700/30 p-4 rounded-lg text-center hover:bg-gray-800/40 transition-colors"
          >
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                className="h-12 mx-auto mb-2 object-contain"
              />
            ) : (
              <div className="h-12 bg-gray-800/50 border border-gray-600/30 rounded mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Logo</span>
              </div>
            )}
            <p className="text-gray-200 text-sm">{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
