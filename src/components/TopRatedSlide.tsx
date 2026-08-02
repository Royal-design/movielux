import React, { useCallback, useEffect, useRef } from "react";
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import type { MediaItemType } from "@/types/MediaType";
import { getMediaReleaseDate, getMediaTitle } from "@/utilities/MediaUtilities";
import { formatDate } from "@/utilities/formateDate";
import { useGetGenresQuery } from "@/redux/features/movieApi";
import { getGenreNames } from "@/utilities/getGenreNames";
import { NavLink } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: MediaItemType[];
  options?: EmblaOptionsType;
};

export const TopRatedSlide: React.FC<PropType> = ({ slides, options }) => {
  const { data: genres } = useGetGenresQuery({ mediaType: "tv" });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    align: "start",
  });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
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
          {slides.map((show, index) => {
            const genreList = genres
              ? getGenreNames(show.genre_ids, genres).split(",").slice(0, 3)
              : [];
            return (
              <div
                key={show.id}
                className={`transform-gpu min-w-0 ${
                  index !== 0 ? "pl-4" : ""
                } flex-[0_0_100%] md:flex-[0_0_75%]`}
              >
                <NavLink
                  to={`/series/${show.id}`}
                  className="block rounded-[1.75rem] overflow-hidden"
                >
                  <div className="relative w-full embla__parallax__layer">
                    <img
                      className="h-[20rem] w-full rounded-[1.75rem] object-cover sm:h-[24rem]"
                      src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                      alt={getMediaTitle(show)}
                    />
                    <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-background via-background/55 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col gap-2.5 sm:gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1">
                            <Star
                              className="size-3.5 fill-gold text-gold"
                              aria-hidden="true"
                            />
                            <span className="font-mono text-sm font-bold text-white">
                              {show.vote_average.toFixed(1)}
                            </span>
                          </span>
                          {formatDate(getMediaReleaseDate(show)) && (
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">
                              {formatDate(getMediaReleaseDate(show))}
                            </span>
                          )}
                          {genreList.map((genre) => (
                            <span
                              key={genre}
                              className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 font-mono text-[11px] text-gold"
                            >
                              {genre.trim()}
                            </span>
                          ))}
                        </div>

                        <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                          {getMediaTitle(show)}
                        </h2>

                        <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:line-clamp-3 md:text-base">
                          {show.overview}
                        </p>

                        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                          Explore series
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 pl-1">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full glass text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full glass text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        />
      </div>
    </div>
  );
};
