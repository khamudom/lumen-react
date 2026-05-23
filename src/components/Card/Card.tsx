import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Card.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Removes default padding from the card body */
  noPadding?: boolean;
  /** Renders as an interactive surface (button semantics via role) */
  interactive?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  /** Heading level for semantic structure */
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, noPadding = false, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "lumen-card",
        noPadding && "lumen-card--no-padding",
        interactive && "lumen-card--interactive",
        className,
      )}
      role={interactive ? "group" : undefined}
      {...props}
    >
      {children}
    </div>
  ),
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("lumen-card__header", className)} {...props}>
      {children}
    </div>
  ),
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = "h3", ...props }, ref) => (
    <Component ref={ref} className={cn("lumen-card__title", className)} {...props}>
      {children}
    </Component>
  ),
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("lumen-card__description", className)} {...props}>
      {children}
    </p>
  ),
);

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("lumen-card__content", className)} {...props}>
      {children}
    </div>
  ),
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("lumen-card__footer", className)} {...props}>
      {children}
    </div>
  ),
);

CardFooter.displayName = "CardFooter";
