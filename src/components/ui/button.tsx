import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] active:shadow-none active:transition-[transform,box-shadow] active:duration-100",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[hsl(200,100%,52%)] via-[hsl(210,100%,48%)] to-[hsl(220,90%,45%)] text-white shadow-[0_4px_14px_hsl(200_100%_50%/0.25),inset_0_1px_0_hsl(0_0%_100%/0.12)] hover:shadow-[0_6px_22px_hsl(200_100%_50%/0.35),inset_0_1px_0_hsl(0_0%_100%/0.15)] hover:scale-[1.03] hover:-translate-y-0.5",
        destructive:
          "bg-gradient-to-br from-destructive via-destructive to-[hsl(0,70%,45%)] text-destructive-foreground shadow-[0_4px_14px_hsl(0_84%_60%/0.25),inset_0_1px_0_hsl(0_0%_100%/0.1)] hover:shadow-[0_6px_22px_hsl(0_84%_60%/0.35)] hover:scale-[1.03] hover:-translate-y-0.5",
        outline:
          "border border-border/60 bg-card/40 backdrop-blur-md text-foreground shadow-[0_2px_8px_hsl(220_20%_0%/0.2),inset_0_1px_0_hsl(0_0%_100%/0.04)] hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 hover:border-primary/40 hover:shadow-[0_4px_16px_hsl(200_100%_50%/0.12)] hover:scale-[1.03] hover:-translate-y-0.5",
        secondary:
          "bg-gradient-to-br from-[hsl(270,70%,58%)] via-secondary to-[hsl(280,60%,50%)] text-secondary-foreground shadow-[0_4px_14px_hsl(270_70%_60%/0.25),inset_0_1px_0_hsl(0_0%_100%/0.12)] hover:shadow-[0_6px_22px_hsl(270_70%_60%/0.35),inset_0_1px_0_hsl(0_0%_100%/0.15)] hover:scale-[1.03] hover:-translate-y-0.5",
        ghost:
          "hover:bg-accent/15 hover:text-accent-foreground hover:shadow-[0_2px_8px_hsl(220_20%_0%/0.15)]",
        link: "text-primary underline-offset-4 hover:underline",
        neon:
          "bg-gradient-to-r from-[hsl(200,100%,50%)] via-[hsl(230,90%,55%)] to-[hsl(270,70%,58%)] text-white shadow-[0_4px_18px_hsl(200_100%_50%/0.3),inset_0_1px_0_hsl(0_0%_100%/0.15)] hover:shadow-[0_6px_28px_hsl(200_100%_50%/0.4),inset_0_1px_0_hsl(0_0%_100%/0.2)] hover:scale-[1.03] hover:-translate-y-0.5",
        glass:
          "bg-card/30 backdrop-blur-xl border border-border/40 text-foreground shadow-[0_2px_10px_hsl(220_20%_0%/0.25),inset_0_1px_0_hsl(0_0%_100%/0.05)] hover:bg-card/50 hover:border-primary/30 hover:shadow-[0_4px_16px_hsl(200_100%_50%/0.1)] hover:scale-[1.03] hover:-translate-y-0.5",
        whatsapp:
          "bg-gradient-to-br from-[hsl(142,70%,49%)] via-[#25D366] to-[hsl(150,60%,40%)] text-white shadow-[0_4px_14px_rgba(37,211,102,0.25),inset_0_1px_0_hsl(0_0%_100%/0.12)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.35),inset_0_1px_0_hsl(0_0%_100%/0.15)] hover:scale-[1.03] hover:-translate-y-0.5",
        youtube:
          "bg-gradient-to-br from-[hsl(0,100%,55%)] via-[#FF0000] to-[hsl(0,85%,42%)] text-white shadow-[0_4px_14px_rgba(255,0,0,0.25),inset_0_1px_0_hsl(0_0%_100%/0.12)] hover:shadow-[0_6px_22px_rgba(255,0,0,0.35),inset_0_1px_0_hsl(0_0%_100%/0.15)] hover:scale-[1.03] hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-13 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
