import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Alert.css";

export type AlertVariant = "default" | "destructive";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: AlertVariant;
}

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, children, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn("lumen-alert", `lumen-alert--${variant}`, className)}
      {...props}
    >
      {children}
    </div>
  ),
);

Alert.displayName = "Alert";

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h5 ref={ref} className={cn("lumen-alert__title", className)} {...props}>
      {children}
    </h5>
  ),
);

AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("lumen-alert__description", className)} {...props}>
      {children}
    </div>
  ),
);

AlertDescription.displayName = "AlertDescription";
