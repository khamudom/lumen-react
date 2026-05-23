import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Badge.css";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("lumen-badge", `lumen-badge--${variant}`, className)}
      {...props}
    >
      {children}
    </span>
  ),
);

Badge.displayName = "Badge";
