import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Badge.css";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "danger"
  | "warning";

export type BadgeAppearance = "filled" | "tint" | "outline" | "ghost";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color variant */
  variant?: BadgeVariant;
  /** Visual treatment applied to the variant */
  appearance?: BadgeAppearance;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "default", appearance = "filled", className, children, ...props },
    ref,
  ) => (
    <span
      ref={ref}
      className={cn(
        "lumen-badge",
        `lumen-badge--${variant}`,
        `lumen-badge--appearance-${appearance}`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);

Badge.displayName = "Badge";
