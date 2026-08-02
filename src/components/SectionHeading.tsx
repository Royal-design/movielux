import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  action?: { label: string; to: string };
  align?: "left" | "center";
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  className,
  action,
  align = "left",
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-6 mb-8",
        align === "center" &&
          "flex-col items-center text-center justify-center",
        className
      )}
    >
      <div
        className={cn(
          "space-y-3",
          align === "center" && "flex flex-col items-center"
        )}
      >
        {eyebrow && (
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-crimson">
            <span className="size-1.5 rounded-full bg-marquee" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-muted max-w-xl text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          to={action.to}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-crimson hover:text-gold transition-colors shrink-0"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};
