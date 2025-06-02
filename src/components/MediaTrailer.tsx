import { hideNavbar, showNavbar } from "@/redux/features/navBar";
import { useAppDispatch } from "@/redux/store";
import type { MediaItemType } from "@/types/MediaType";
import { getMediaTitle } from "@/utilities/MediaUtilities";
import React, { useCallback, useEffect } from "react";

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
      document.body.style.overflow = "unset";
    };
  }, [isPlaying, handleCloseModal]);

  if (!isPlaying) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={handleCloseModal}
    >
      <div
        className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
          title={`${getMediaTitle(media)} - Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <button
          onClick={handleCloseModal}
          className="absolute -top-12 right-0 sm:top-4 sm:right-4 text-white text-2xl font-bold bg-black/70 hover:bg-black/90 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          aria-label="Close trailer"
        >
          ✕
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
        Press ESC or click outside to close
      </div>
    </div>
  );
};
