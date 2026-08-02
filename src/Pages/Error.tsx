import type React from "react";
import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Film, RotateCw } from "lucide-react";

export const Error: React.FC = () => {
  const error = useRouteError();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      const { status, statusText } = error;
      switch (status) {
        case 404:
          return {
            code: "404",
            title: "Page not found",
            message: "The reel you're looking for has been cut. It may have moved or never existed.",
          };
        case 500:
          return {
            code: "500",
            title: "Server error",
            message: "Something went wrong on our end. Please try again in a moment.",
          };
        default:
          return {
            code: String(status),
            title: "Something went wrong",
            message: statusText || "An unexpected error occurred.",
          };
      }
    }
    return {
      code: "!",
      title: "Unexpected error",
      message: "An unexpected error occurred. Let's get you back to the show.",
    };
  };

  const { code, title, message } = getErrorMessage();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-crimson/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-marquee text-white shadow-glow animate-glow">
        <Film className="size-8" aria-hidden="true" />
      </div>

      <p className="font-mono text-sm uppercase tracking-[0.4em] text-crimson">
        Error {code}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-muted">{message}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/">
          <Button size="lg">
            <Home aria-hidden="true" />
            Back home
          </Button>
        </Link>
        <Button size="lg" variant="outline" onClick={() => window.location.reload()}>
          <RotateCw aria-hidden="true" />
          Reload
        </Button>
      </div>
    </div>
  );
};
