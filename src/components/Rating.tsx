import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
  ringClassName?: string;
}

export const scoreColor = (value: number) => {
  if (value >= 7.5) return "#f2b14f";
  if (value >= 6) return "#e8c35a";
  return "#e43a45";
};

export const Rating = ({
  value,
  size = 40,
  showValue = true,
  className,
  ringClassName,
}: RatingProps) => {
  const pct = Math.max(0, Math.min(100, value * 10));
  const circumference = 2 * Math.PI * 15.5;
  const color = scoreColor(value);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 10`}
    >
      <svg viewBox="0 0 36 36" className="size-full -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2.5"
        />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
          className={ringClassName}
        />
      </svg>
      {showValue && (
        <span
          className="absolute inset-0 flex items-center justify-center font-mono font-bold text-white"
          style={{ fontSize: Math.max(9, size * 0.27) }}
        >
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};
