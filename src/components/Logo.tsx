import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="MovieLux home"
    >
      <span className="relative inline-flex">
        <span className="flex size-10 items-center justify-center rounded-xl bg-marquee text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
          <Clapperboard className="size-5" aria-hidden="true" />
        </span>
        <span
          className="absolute inset-0 -z-10 rounded-xl bg-marquee opacity-40 blur-lg transition-opacity duration-300 group-hover:opacity-70"
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-[0.12em] text-foreground">
          MOVIELUX
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.35em] text-subtle">
          Premium Cinema
        </span>
      </span>
    </Link>
  );
};
