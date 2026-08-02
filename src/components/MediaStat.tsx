import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaStatProps {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: "default" | "gold" | "crimson";
}

export const MediaStat = ({
  icon: Icon,
  label,
  value,
  tone = "default",
}: MediaStatProps) => {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border bg-surface/70 px-3.5 py-2 shadow-soft">
      <Icon
        className={cn(
          "size-4 shrink-0",
          tone === "gold" ? "text-gold" : tone === "crimson" ? "text-crimson" : "text-muted"
        )}
        aria-hidden="true"
      />
      <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
};
