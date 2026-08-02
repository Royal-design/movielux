import { Layout } from "@/layout/Layout";

export const MovingLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[40vh] w-full skeleton-shimmer" />
      <Layout>
        <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-8 aspect-[2/3] w-full rounded-2xl border border-border skeleton-shimmer" />
          </div>
          <div className="space-y-5 lg:col-span-2">
            <div className="h-10 w-3/4 skeleton-shimmer rounded-xl" />
            <div className="h-4 w-1/2 skeleton-shimmer rounded-lg" />
            <div className="flex flex-wrap gap-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-9 w-28 skeleton-shimmer rounded-xl" />
              ))}
            </div>
            <div className="space-y-3 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 skeleton-shimmer rounded-lg ${
                    i === 3 ? "w-2/3" : "w-full"
                  }`}
                />
              ))}
            </div>
            <div className="aspect-video w-full rounded-2xl border border-border skeleton-shimmer pt-6" />
          </div>
        </div>
      </Layout>
    </div>
  );
};
