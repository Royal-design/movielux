import React, { useCallback, useEffect, useRef } from "react";
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from "./EmblaCarouselArrowButtons";
import type { MediaItemType } from "@/types/MediaType";
import { getMediaReleaseDate, getMediaTitle } from "@/utilities/MediaUtilities";
import { formatDate } from "@/utilities/formateDate";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: MediaItemType[];
  options?: EmblaOptionsType;
};

export const TopRatedSlide: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `translateX(${translate}%)`;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y ml-[-1rem]">
          {slides.map((show) => (
            <div
              className="transform-gpu flex-[0_0_80%] min-w-0 pl-4"
              key={show.id}
            >
              <div className="rounded-[1.8rem] overflow-hidden">
                <div className="w-full flex flex-col embla__parallax__layer">
                  <img
                    className="rounded-[1.8rem] block w-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt={getMediaTitle(show)}
                  />

                  {/* Overlay text BELOW the image instead of absolute on top */}
                  <div className="bg-background/80 text-white p-4 max-w-2xl">
                    <div className="w-full md:max-w-2xl md:mt-4">
                      <p className="text-primary text-lg md:text-xl font-rajdhani mb-2">
                        ★{" "}
                        <span className="text-white text-lg">
                          {show.vote_average} /{" "}
                        </span>
                        <span className="text-sm text-white">
                          {formatDate(getMediaReleaseDate(show))}
                        </span>
                      </p>
                      <h2 className="text-xl md:text-3xl font-inter font-bold text-white mb-2">
                        {getMediaTitle(show)}
                      </h2>
                      <p className="text-white md:text-lg leading-relaxed mb-2 font-light">
                        {show.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-7">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="bg-white inline-flex cursor-pointer w-6 h-6 p-1 rounded-full text-current items-center justify-center"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="bg-white inline-flex cursor-pointer w-6 h-6 p-1 rounded-full text-current items-center justify-center"
        />
      </div>
    </div>
  );
};
