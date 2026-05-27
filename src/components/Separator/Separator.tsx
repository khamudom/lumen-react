import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Separator.css";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  /** When true, separator is hidden from assistive technology */
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "lumen-separator",
        `lumen-separator--${orientation}`,
        className,
      )}
      {...props}
    />
  ),
);

Separator.displayName = "Separator";
