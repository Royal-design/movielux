import { Navbar } from "@/components/Navbar";
import React from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const isDetailPage =
    matchPath("/movies/movie/:id", location.pathname) ||
    matchPath("/series/:id", location.pathname);
  return (
    <div>
      {!isDetailPage && <Navbar />}

      <main className="">
        <Outlet />
      </main>
    </div>
  );
};
