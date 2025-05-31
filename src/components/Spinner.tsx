import React from "react";

export const Spinner: React.FC = () => {
  return (
    <div className="w-full h-dvh md:h-screen flex justify-center items-center">
      <div className="api-loader">
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
        <div className="bar4" />
        <div className="bar5" />
        <div className="bar6" />
        <div className="bar7" />
        <div className="bar8" />
        <div className="bar9" />
        <div className="bar10" />
        <div className="bar11" />
        <div className="bar12" />
      </div>
    </div>
  );
};
