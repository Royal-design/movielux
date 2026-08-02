import { hideNavbar, showNavbar } from "@/redux/features/navBar";
import { useAppDispatch } from "@/redux/store";
import type { MediaItemType } from "@/types/MediaType";
import { getMediaTitle } from "@/utilities/MediaUtilities";
import { useCallback, useEffect } from "react";
import { X } from "lucide-react";

export const MediaTrailer: React.FC<{
  media: MediaItemType;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  trailerKey: string;
}> = ({ media, isPlaying, setIsPlaying, trailerKey }) => {
  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  useEffect(() => {
    if (isPlaying) {
      dispatch(hideNavbar());
    } else {
      dispatch(showNavbar());
    }

    return () => {
      dispatch(showNavbar());
    };
  }, [isPlaying, dispatch]);

  useEffect(() => {
    if (!isPlaying) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isPlaying, handleCloseModal]);

  if (!isPlaying) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
      onClick={handleCloseModal}
      role="dialog"
      aria-modal="true"
      aria-label={`${getMediaTitle(media)} trailer`}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lift animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
          title={`${getMediaTitle(media)} - Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <button
          onClick={handleCloseModal}
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/85 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white cursor-pointer"
          aria-label="Close trailer"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
        Press ESC to close
      </div>
    </div>
  );
};
