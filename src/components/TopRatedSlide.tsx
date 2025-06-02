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
import { useGetGenresQuery } from "@/redux/features/movieApi";
import { getGenreNames } from "@/utilities/getGenreNames";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: MediaItemType[];
  options?: EmblaOptionsType;
};

export const TopRatedSlide: React.FC<PropType> = ({ slides, options }) => {
  const { data: genres } = useGetGenresQuery({ mediaType: "tv" });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    align: "start"
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
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((show, index) => (
            <div
              key={show.id}
              className={`transform-gpu min-w-0 ${
                index !== 0 ? "pl-4" : ""
              } flex-[0_0_100%] md:flex-[0_0_75%]`}
            >
              <div className="rounded-[1.8rem] overflow-hidden">
                <div className="relative w-full embla__parallax__layer">
                  <img
                    className="rounded-[1.8rem] w-full h-[20rem] sm:h-[25rem]  object-cover"
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt={getMediaTitle(show)}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/80 to-transparent text-white p-3 sm:p-4 md:p-6">
                    <div className="w-full max-w-full flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
                      <p className="text-primary text-sm sm:text-lg md:text-xl font-rajdhani flex flex-wrap items-center gap-2">
                        <span>★ {show.vote_average.toFixed(1)}</span>
                        <span className="text-white text-xs sm:text-sm md:text-base">
                          {formatDate(getMediaReleaseDate(show))}
                        </span>
                      </p>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-playfair font-bold text-white leading-tight">
                        {getMediaTitle(show)}
                      </h2>
                      <p className="text-white text-xs sm:text-sm md:text-base font-light leading-relaxed font-urbanist line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                        {show.overview}
                      </p>
                      <p className="text-xs font-rajdhani sm:text-sm text-primary">
                        {genres ? getGenreNames(show.genre_ids, genres) : ""}
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
          className="bg-primary/20 inline-flex cursor-pointer w-5 h-5 sm:w-7 sm:h-7 p-2 rounded-full text-white/60 items-center justify-center hover:bg-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="bg-primary/20 inline-flex cursor-pointer w-5 h-5 sm:w-7 sm:h-7 p-2 rounded-full text-white/60 items-center justify-center hover:bg-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};
