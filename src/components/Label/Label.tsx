import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Label.css";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Disables pointer events and reduces opacity */
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, disabled, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("lumen-label", disabled && "lumen-label--disabled", className)}
      aria-disabled={disabled || undefined}
      {...props}
    />
  ),
);

Label.displayName = "Label";
