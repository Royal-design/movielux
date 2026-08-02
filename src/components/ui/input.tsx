import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-subtle selection:bg-crimson selection:text-primary-foreground bg-white/[0.04] flex h-11 w-full min-w-0 rounded-xl border border-border-strong px-4 py-2 text-sm text-foreground shadow-soft transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-crimson/60 focus-visible:ring-crimson/25 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive/70 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
