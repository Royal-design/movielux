import type { ReactNode } from "react";
import { WifiOff } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
}

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load this content. Check your connection and try again.",
  action,
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-6 py-16">
      <div className="relative mb-6">
        <div className="size-16 rounded-2xl bg-marquee/15 border border-crimson/30 flex items-center justify-center">
          <WifiOff className="size-8 text-crimson" aria-hidden="true" />
        </div>
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground">
        {title}
      </h2>
      <p className="text-muted mt-2 max-w-md text-sm leading-relaxed">
        {message}
      </p>
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
};
