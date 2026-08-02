import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";

interface PageLoaderProps {
  label?: string;
  className?: string;
}

export const PageLoader = ({ label = "Loading", className }: PageLoaderProps) => {
  return (
    <div
      className={cn(
        "min-h-dvh flex flex-col items-center justify-center gap-6",
        className
      )}
      role="status"
      aria-label={label}
    >
      <div className="relative">
        <div className="size-16 rounded-2xl bg-marquee flex items-center justify-center shadow-glow animate-glow">
          <Clapperboard className="size-8 text-white" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-marquee blur-xl opacity-40 animate-pulse-soft -z-10" />
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-muted animate-pulse-soft">
        {label}
      </span>
    </div>
  );
};
