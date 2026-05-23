import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Button.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export type ButtonIconPosition = "start" | "end";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Shows loading spinner and disables interaction */
  loading?: boolean;
  /** Icon element rendered beside label */
  icon?: ReactNode;
  /** Position of the icon relative to children */
  iconPosition?: ButtonIconPosition;
  /** Expands button to full container width */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      loading = false,
      disabled,
      icon,
      iconPosition = "start",
      fullWidth = false,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        className={cn(
          "lumen-button",
          `lumen-button--${variant}`,
          fullWidth && "lumen-button--full-width",
          loading && "lumen-button--loading",
          className,
        )}
        {...props}
      >
        {loading && (
          <span className="lumen-button__spinner" aria-hidden="true">
            <span className="lumen-sr-only">Loading</span>
          </span>
        )}
        {icon && iconPosition === "start" && !loading && (
          <span className="lumen-button__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {children != null && children !== "" && (
          <span className="lumen-button__label">{children}</span>
        )}
        {icon && iconPosition === "end" && !loading && (
          <span className="lumen-button__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
