import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 outline-none disabled:pointer-events-none disabled:opacity-50 shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-ring/40 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "bg-marquee text-white shadow-glow hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0",
        gold:
          "bg-gold text-[#2a1a05] shadow-glow-gold hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-border-strong bg-white/[0.03] text-foreground hover:bg-white/[0.07] hover:border-white/25 backdrop-blur-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        ghost:
          "text-foreground hover:bg-white/[0.06] hover:text-white",
        link: "text-crimson underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-white shadow-glow hover:brightness-110 hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-12 rounded-xl px-7 has-[>svg]:px-5",
        xl: "h-14 rounded-2xl px-8 text-base has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
