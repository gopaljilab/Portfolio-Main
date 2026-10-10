import React, { forwardRef } from "react";
import { useTilt, type UseTiltOptions } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";

export interface TiltCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    UseTiltOptions {}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      className,
      maxTilt = 4.5,
      scale = 1.015,
      perspective = 1000,
      disabled,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useTilt<HTMLDivElement>({
      maxTilt,
      scale,
      perspective,
      disabled,
    });

    return (
      <div
        ref={(node) => {
          (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TiltCard.displayName = "TiltCard";
