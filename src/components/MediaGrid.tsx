import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SkeletonCard } from "./SkeletonCard";

interface MediaGridProps {
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
  children?: ReactNode;
}

export const MediaGrid = ({
  loading,
  skeletonCount = 8,
  className,
  children,
}: MediaGridProps) => {
  if (loading) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6",
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
};
