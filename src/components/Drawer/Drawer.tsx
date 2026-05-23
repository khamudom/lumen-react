import {
  type DialogHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import "./Drawer.css";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps extends DialogHTMLAttributes<HTMLDialogElement> {
  /** Whether the drawer is visible. */
  open: boolean;
  /** Called when the drawer requests to close. */
  onOpenChange?: (open: boolean) => void;
  /** Edge the drawer slides from. */
  side?: DrawerSide;
  /** Accessible drawer heading. */
  heading?: ReactNode;
  /** Optional supporting description. */
  description?: ReactNode;
  children?: ReactNode;
  hideCloseButton?: boolean;
  disableOverlayClose?: boolean;
}

export const Drawer = forwardRef<HTMLDialogElement, DrawerProps>(
  (
    {
      open,
      onOpenChange,
      side = "right",
      heading,
      description,
      children,
      hideCloseButton = false,
      disableOverlayClose = false,
      className,
      ...props
    },
    ref,
  ) => {
    const headingId = useId();
    const descriptionId = useId();

    useEffect(() => {
      if (!open) {
        return undefined;
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onOpenChange?.(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onOpenChange, open]);

    if (!open) {
      return null;
    }

    return createPortal(
      <div className="lumen-drawer__portal">
        <div
          className="lumen-drawer__overlay"
          onClick={() => {
            if (!disableOverlayClose) {
              onOpenChange?.(false);
            }
          }}
        />
        <dialog
          ref={ref}
          open
          aria-modal="true"
          aria-labelledby={heading ? headingId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={cn("lumen-drawer", `lumen-drawer--${side}`, className)}
          {...props}
        >
          {!hideCloseButton && (
            <button
              type="button"
              className="lumen-drawer__close"
              aria-label="Close drawer"
              onClick={() => onOpenChange?.(false)}
            >
              ×
            </button>
          )}
          {(heading || description) && (
            <div className="lumen-drawer__header">
              {heading && (
                <h2 id={headingId} className="lumen-drawer__heading">
                  {heading}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="lumen-drawer__description">
                  {description}
                </p>
              )}
            </div>
          )}
          <div className="lumen-drawer__body">{children}</div>
        </dialog>
      </div>,
      document.body,
    );
  },
);

Drawer.displayName = "Drawer";
