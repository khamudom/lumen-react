import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Progress.css";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0–100) */
  value?: number;
  /** Accessible label for the progress bar */
  label?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, label = "Progress", ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        aria-label={label}
        className={cn("lumen-progress", className)}
        {...props}
      >
        <div
          className="lumen-progress__indicator"
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </div>
    );
  },
);

Progress.displayName = "Progress";
