import { Skeleton } from "./ui/skeleton";

export const SkeletonCard: React.FC = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="min-h-[300px] sm:min-h-[340px] rounded-none md:min-h-[340px] rounded-t-lg bg-primary/5" />
    <div className="space-y-2">
      <Skeleton className="h-2 w-[200px] bg-primary/5" />
      <Skeleton className="h-2 w-[250px] bg-primary/5" />
    </div>
  </div>
);
