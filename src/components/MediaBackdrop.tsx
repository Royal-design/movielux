import { Layout } from "@/layout/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface MediaBackdropProps {
  backdrop_path: string | null;
  title: string;
  tagline?: string;
  backTo: string;
}

export const MediaBackdrop = ({
  backdrop_path,
  title,
  tagline,
  backTo,
}: MediaBackdropProps) => {
  return (
    <div className="relative min-h-[55vh] overflow-hidden">
      <div className="absolute inset-0">
        {backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title}
            className="size-full object-cover"
          />
        ) : (
          <div className="size-full skeleton-shimmer" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/20" />
      </div>

      <Layout className="relative z-10 flex min-h-[55vh] flex-col justify-end pb-10 pt-28">
        <Link
          to={backTo}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white/30 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Link>
        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {tagline && (
          <p className="mt-3 text-lg italic text-white/70 md:text-xl">
            {tagline}
          </p>
        )}
      </Layout>
    </div>
  );
};
