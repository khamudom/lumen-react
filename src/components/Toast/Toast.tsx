import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Toast.css";

export type ToastVariant = "default" | "success" | "warning" | "danger";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: ToastVariant;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = "default",
      title,
      description,
      action,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role={variant === "danger" ? "alert" : "status"}
      className={cn("lumen-toast", `lumen-toast--${variant}`, className)}
      {...props}
    >
      <div className="lumen-toast__content">
        {title && <p className="lumen-toast__title">{title}</p>}
        {description && (
          <p className="lumen-toast__description">{description}</p>
        )}
        {children}
      </div>
      {action && <div className="lumen-toast__action">{action}</div>}
      {onClose && (
        <button
          type="button"
          className="lumen-toast__close"
          aria-label="Dismiss notification"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  ),
);

Toast.displayName = "Toast";
