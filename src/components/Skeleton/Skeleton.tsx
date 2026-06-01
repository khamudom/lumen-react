import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Skeleton.css";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("lumen-skeleton", className)}
      {...props}
    />
  ),
);

Skeleton.displayName = "Skeleton";
