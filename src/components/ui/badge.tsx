import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex cursor-default items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors font-mono tracking-wide",
  {
    variants: {
      variant: {
        default: "border-crimson/40 bg-crimson/15 text-[#ffb3b8]",
        gold: "border-gold/40 bg-gold/15 text-gold",
        outline: "border-border-strong bg-white/[0.04] text-foreground",
        surface: "border-border bg-surface-raised text-muted",
        subtle: "border-transparent bg-white/[0.05] text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
