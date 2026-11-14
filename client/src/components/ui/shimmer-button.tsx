import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  borderRadius?: string;
  background?: string;
}

/**
 * ShimmerButton inspired by Vengeance UI micro-interaction components.
 * Renders an animated rotating conic gradient border trail with solid background fill,
 * hover elevation, and click compression.
 */
export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      children,
      className,
      shimmerColor = "#38bdf8",
      borderRadius = "14px",
      background,
      onClick,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.015 }}
        whileTap={disabled ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        onClick={onClick}
        className={cn(
          "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap font-bold text-white shadow-md transition-all duration-300 hover:shadow-cyan-500/25 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100",
          className
        )}
        style={{
          borderRadius,
        }}
        {...(props as any)}
      >
        {/* Animated Conic Border Shimmer */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            borderRadius,
          }}
        >
          <div
            className="absolute inset-[-150%] animate-[spin_3s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 320deg, ${shimmerColor} 360deg)`,
            }}
          />
        </div>

        {/* Base button backdrop */}
        <div
          className="absolute inset-[2px] transition-all duration-300 group-hover:brightness-105 bg-[#0891b2] dark:bg-[#06b6d4]"
          style={{
            borderRadius: `calc(${borderRadius} - 2px)`,
            ...(background ? { backgroundColor: background } : {}),
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2 font-display text-white tracking-wide">
          {children}
        </span>
      </motion.button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
