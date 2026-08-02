import type { ReactNode } from "react";
import { Clapperboard } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-6 rounded-3xl border border-dashed border-border-strong bg-white/[0.02]">
      <div className="size-14 rounded-2xl bg-marquee/15 border border-crimson/30 flex items-center justify-center mb-5">
        <Clapperboard className="size-7 text-crimson" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground">
        {title}
      </h3>
      {description && (
        <p className="text-muted mt-2 max-w-md text-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
