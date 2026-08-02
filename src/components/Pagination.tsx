import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  isDisabled: boolean;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isDisabled,
}: PaginationProps) => (
  <div className="flex items-center justify-center gap-4 pt-2">
    <button
      onClick={onPrevious}
      disabled={currentPage === 1 || isDisabled}
      aria-label="Previous page"
      className={cn(
        "flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-white/[0.03] text-foreground transition-all duration-300 hover:border-crimson/40 hover:text-crimson disabled:cursor-not-allowed disabled:opacity-35"
      )}
    >
      <ChevronLeft className="size-5" aria-hidden="true" />
    </button>

    <span className="rounded-full glass px-4 py-1.5 font-mono text-xs text-muted">
      Page <span className="font-bold text-foreground">{currentPage}</span> of{" "}
      <span className="font-bold text-foreground">{totalPages || 1}</span>
    </span>

    <button
      onClick={onNext}
      disabled={currentPage === totalPages || isDisabled}
      aria-label="Next page"
      className={cn(
        "flex size-10 cursor-pointer items-center justify-center rounded-full border border-border-strong bg-white/[0.03] text-foreground transition-all duration-300 hover:border-crimson/40 hover:text-crimson disabled:cursor-not-allowed disabled:opacity-35"
      )}
    >
      <ChevronRight className="size-5" aria-hidden="true" />
    </button>
  </div>
);
