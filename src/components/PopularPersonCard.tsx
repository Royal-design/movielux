import { cn } from "@/lib/utils";
import type { PersonType } from "@/types/PersonType";
import { getGenderLabel } from "@/utilities/getGender";
import React from "react";
import { Card, CardContent } from "./ui/card";
import type { CastMember } from "@/types/CreditsType";

interface PersonProps {
  person: CastMember | PersonType;
}

export const PopularPersonCard: React.FC<PersonProps> = ({ person }) => {
  return (
    <Card
      className={cn(
        "p-0 gap-0",
        "group relative w-full h-full",
        "min-h-[280px] sm:min-h-[320px] md:min-h-[360px]",
        "bg-gradient-to-b from-zinc-900/50 to-zinc-950/80",
        "border border-zinc-800/50 hover:border-zinc-700/70",
        "overflow-hidden transition-all duration-300 ease-in-out",
        "hover:scale-[1.02] hover:shadow-xl hover:shadow-zinc-900/20",
        "cursor-pointer"
      )}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {/* Image Container with Gradient Overlay */}
        <div className="relative flex-shrink-0 h-40 sm:h-48 md:h-56 overflow-hidden">
          {person.profile_path ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w400${person.profile_path}`}
                alt={person.name}
                className={cn(
                  "w-full h-full object-cover object-center",
                  "transition-transform duration-500 ease-out",
                  "group-hover:scale-110"
                )}
                loading="lazy"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </>
          ) : (
            <div
              className={cn(
                "w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-800",
                "flex items-center justify-center text-zinc-400",
                "text-2xl font-light"
              )}
            >
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}

          {/* Popularity Badge */}
          <div
            className={cn(
              "absolute top-2 right-2 px-2 py-1 rounded-full",
              "bg-primary/90 backdrop-blur-sm",
              "text-xs font-semibold text-white",
              "shadow-lg"
            )}
          >
            ★ {person.popularity.toFixed(1)}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Name */}
            <h3
              className={cn(
                "text-base sm:text-lg font-bold text-white",
                "line-clamp-2 leading-tight",
                "group-hover:text-primary transition-colors duration-200"
              )}
            >
              {person.name}
            </h3>

            {/* Known For Department */}
            <div
              className={cn(
                "inline-flex items-center px-2 py-1 rounded-md",
                "bg-zinc-800/60 border border-zinc-700/50",
                "text-xs font-medium text-zinc-300"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
              {person.known_for_department}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-3 pt-3 border-t border-zinc-800/50">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="capitalize">
                {getGenderLabel(person.gender)}
              </span>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-medium text-zinc-300">
                  {person.popularity > 10
                    ? "Hot"
                    : person.popularity > 5
                    ? "Popular"
                    : "Rising"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "pointer-events-none"
          )}
        />
      </CardContent>
    </Card>
  );
};
