import useEmblaCarousel from "embla-carousel-react";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyOf: (item: T) => string | number;
  slideClassName?: string;
  className?: string;
  viewportClassName?: string;
  loop?: boolean;
  dragFree?: boolean;
  align?: "start" | "center" | "end";
  showArrows?: boolean;
  showDots?: boolean;
}

export function Carousel<T>({
  items,
  renderItem,
  keyOf,
  slideClassName,
  className,
  viewportClassName,
  loop = false,
  dragFree = true,
  align = "start",
  showArrows = true,
  showDots = false,
}: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    dragFree,
    align,
    skipSnaps: false,
  });

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    if (!api) return;
    setPrevEnabled(api.canScrollPrev());
    setNextEnabled(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const init = () => {
      setSnaps(emblaApi.scrollSnapList());
      onSelect(emblaApi);
    };
    init();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", init);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", init);
    };
  }, [emblaApi, onSelect]);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 size-9 rounded-full glass text-foreground flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:text-white hover:border-white/30 hover:-translate-y-1/2 hover:scale-105";

  return (
    <div className={cn("relative", className)}>
      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!prevEnabled}
            aria-label="Previous"
            className={cn(arrowClass, "-left-4")}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!nextEnabled}
            aria-label="Next"
            className={cn(arrowClass, "-right-4")}
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}

      <div
        className={cn("overflow-hidden", viewportClassName)}
        ref={emblaRef}
      >
        <div className="flex touch-pan-y">
          {items.map((item, index) => (
            <div
              key={keyOf(item)}
              className={cn(
                "min-w-0 shrink-0 pl-3 first:pl-0",
                slideClassName
              )}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {showDots && snaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {snaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex}
              className={cn(
                "h-1.5 rounded-full transition-all duration-400 cursor-pointer",
                index === selectedIndex
                  ? "w-6 bg-marquee"
                  : "w-1.5 bg-border-strong hover:bg-white/30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
