"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "subtle";
type Size = "md" | "lg";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref" | "children"> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children?: React.ReactNode;
};

const base =
  "focus-accent inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#06251b] shadow-[0_10px_40px_-12px_rgba(128,229,147,0.6)] hover:shadow-[0_16px_50px_-10px_rgba(128,229,147,0.75)]",
  ghost:
    "border border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.06] hover:border-white/20",
  subtle: "text-secondary hover:text-primary hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";
