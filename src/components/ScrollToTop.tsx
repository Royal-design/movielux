import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", toggleVisibility, {
      passive: true,
    });

    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "group fixed z-[9999]",
        "right-5 bottom-5 md:right-8 md:bottom-8",

        "flex h-12 w-12 items-center justify-center rounded-full",

        "bg-marquee text-white shadow-xl backdrop-blur",

        "transition-all duration-500 ease-out",

        "hover:-translate-y-1 hover:scale-105",
        "active:scale-95",

        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-marquee/40",

        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-6 opacity-0 pointer-events-none",
      )}
      style={{
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <ArrowUp
        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />

      <span className="pointer-events-none absolute inset-0 rounded-full bg-marquee opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
    </button>
  );
};
