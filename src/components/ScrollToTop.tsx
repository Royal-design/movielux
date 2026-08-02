import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 320);
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed z-50",
        "bottom-6 right-6",
        "sm:bottom-12 sm:right-12",
        "xl:bottom-14 xl:right-14",
        "group relative flex size-11 items-center justify-center rounded-full bg-marquee text-white",
        "shadow-glow transition-all duration-300 ease-out",
        "hover:scale-110 active:scale-95 cursor-pointer",
        "animate-scale-in"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp
        className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
      <span className="absolute inset-0 rounded-full bg-marquee opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50" />
    </button>
  );
};
