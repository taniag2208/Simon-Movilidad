"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type CardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  hover?: boolean;
  children?: React.ReactNode;
};

/** Tarjeta base de vidrio oscuro con borde sutil y esquinas muy redondeadas. */
export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-3xl shadow-card",
        hover &&
          "transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
