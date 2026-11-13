import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

/**
 * ShimmerButton inspired by Vengeance UI micro-interaction components.
 * Renders an animated rotating conic gradient border trail with smooth hover elevation and tactile click response.
 */
export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      children,
      className,
      shimmerColor = "#06b6d4",
      shimmerSize = "0.1em",
      borderRadius = "100px",
      shimmerDuration = "2.5s",
      background = "rgba(6, 182, 212, 1)",
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.975 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        onClick={onClick}
        className={cn(
          "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 font-bold text-white shadow-md transition-shadow duration-300 hover:shadow-cyan-500/25 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
          className
        )}
        style={{
          borderRadius,
        }}
        {...(props as any)}
      >
        {/* Animated Conic Border Shimmer */}
        <div
          className="absolute inset-0 -z-30 overflow-hidden"
          style={{
            borderRadius,
          }}
        >
          <div
            className="absolute inset-[-100%] animate-[spin_3s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0 340deg, ${shimmerColor} 360deg)`,
            }}
          />
        </div>

        {/* Base button backdrop */}
        <div
          className="absolute inset-[1.5px] -z-20 transition-all duration-300 group-hover:brightness-110"
          style={{
            borderRadius: `calc(${borderRadius} - 1.5px)`,
            backgroundColor: background,
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 font-display tracking-wide">
          {children}
        </span>
      </motion.button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
