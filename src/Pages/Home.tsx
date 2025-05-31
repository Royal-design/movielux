import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { PopularPerson } from "@/components/PopularPerson";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TopRatedTvShow } from "@/components/TopRatedTvShow";
import { Trending } from "@/components/Trending";
import { UpcomingMovies } from "@/components/UpcomingMovies";

import React, { useState } from "react";

export const Home: React.FC = () => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  return (
    <div>
      <HeroSection onLoaded={() => setIsHeroLoaded(true)} />

      {/* Only render MovieCards after hero has loaded */}
      {isHeroLoaded && (
        <div className="">
          <Trending />
          <TopRatedTvShow />
          <UpcomingMovies />
          <PopularPerson />
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </div>
  );
};
