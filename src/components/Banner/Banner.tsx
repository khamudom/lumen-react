import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Banner.css";

export type BannerVariant = "default" | "success" | "warning" | "danger";

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: BannerVariant;
  /** Called when the dismiss button is clicked. The button is only rendered when this is set. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss button. @default "Dismiss banner" */
  dismissLabel?: string;
}

export interface BannerTitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface BannerDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      children,
      variant = "default",
      onDismiss,
      dismissLabel = "Dismiss banner",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role={variant === "danger" ? "alert" : "status"}
      className={cn("lumen-banner", `lumen-banner--${variant}`, className)}
      {...props}
    >
      <div className="lumen-banner__content">{children}</div>
      {onDismiss && (
        <button
          type="button"
          className="lumen-banner__dismiss"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          ×
        </button>
      )}
    </div>
  ),
);

Banner.displayName = "Banner";

export const BannerTitle = forwardRef<HTMLParagraphElement, BannerTitleProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("lumen-banner__title", className)} {...props}>
      {children}
    </p>
  ),
);

BannerTitle.displayName = "BannerTitle";

export const BannerDescription = forwardRef<HTMLDivElement, BannerDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("lumen-banner__description", className)} {...props}>
      {children}
    </div>
  ),
);

BannerDescription.displayName = "BannerDescription";
