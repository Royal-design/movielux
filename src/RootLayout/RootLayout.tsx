import { Navbar } from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

export const RootLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};
