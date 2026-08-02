import React, {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const arrowBase =
  "inline-flex size-10 items-center justify-center rounded-full glass text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = ({ className, ...props }) => {
  return (
    <button
      type="button"
      aria-label="Previous slide"
      className={cn(arrowBase, className)}
      {...props}
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
    </button>
  );
};

export const NextButton: React.FC<PropType> = ({ className, ...props }) => {
  return (
    <button
      type="button"
      aria-label="Next slide"
      className={cn(arrowBase, className)}
      {...props}
    >
      <ChevronRight className="size-4" aria-hidden="true" />
    </button>
  );
};
