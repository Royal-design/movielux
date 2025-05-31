import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-12 h-12 bg-gradient-to-r from-primary-red to-primary-red/80",
        "hover:from-primary-red/90 hover:to-primary-red",
        "text-white rounded-full shadow-lg hover:shadow-xl",
        "flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        "hover:scale-110 active:scale-95",
        "backdrop-blur-sm border border-primary-red/20",
        "group"
      )}
      aria-label="Scroll to top"
    >
      {/* Animated Arrow */}
      <svg
        className={cn(
          "w-5 h-5 transition-transform duration-200",
          "group-hover:-translate-y-0.5"
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>

      {/* Ripple Effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-white/20 scale-0 group-hover:scale-100",
          "transition-transform duration-300 ease-out"
        )}
      />
    </button>
  );
};
