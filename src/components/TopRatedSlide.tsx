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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    align: "start" // Ensures the first slide starts flush left
  });
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
    <div className="">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((show, index) => (
            <div
              key={show.id}
              className={`transform-gpu flex-[0_0_75%] min-w-0 ${
                index !== 0 ? "pl-4" : ""
              }`}
            >
              <div className="rounded-[1.8rem] overflow-hidden">
                <div className="relative w-full flex justify-center embla__parallax__layer flex-col">
                  <img
                    className="rounded-[1.8rem] w-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt={getMediaTitle(show)}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-background/80 text-white p-4 max-w-2xl">
                    <div className="w-full md:max-w-2xl md:mt-16">
                      <p className="text-primary text-lg md:text-xl font-rajdhani mb-4">
                        ★{" "}
                        <span className="text-white text-lg">
                          {show.vote_average} /{" "}
                        </span>
                        <span className="text-sm text-white">
                          {formatDate(getMediaReleaseDate(show))}
                        </span>
                      </p>
                      <h2 className="text-xl md:text-3xl font-inter font-bold text-white mb-4">
                        {getMediaTitle(show)}
                      </h2>
                      <p className="text-white text-base leading-relaxed mb-4 font-light">
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

      <div className="flex gap-3 pl-4 mt-7">
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
