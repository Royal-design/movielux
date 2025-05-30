import { HeroSection } from "@/components/HeroSection";
import { TopRatedTvShow } from "@/components/TopRatedTvShow";
import { Trending } from "@/components/Trending";

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
        </div>
      )}
    </div>
  );
};
