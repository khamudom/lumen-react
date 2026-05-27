import {
  type DialogHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { mergeRefs } from "../../utils/mergeRefs";
import { useModalFocus } from "../../utils/useModalFocus";
import "./Dialog.css";

export interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  /** Whether the dialog is visible. */
  open: boolean;
  /** Called when the dialog requests to close. */
  onOpenChange?: (open: boolean) => void;
  /** Accessible dialog heading. */
  heading?: ReactNode;
  /** Optional supporting description. */
  description?: ReactNode;
  /** Dialog body content. */
  children?: ReactNode;
  /** Hides the default close button. */
  hideCloseButton?: boolean;
  /** Prevents closing when the overlay is clicked. */
  disableOverlayClose?: boolean;
  /** Whether focus returns to the trigger when the dialog closes. @default true */
  returnFocus?: boolean;
  /** Element to receive focus when the dialog closes. Overrides the previously focused element. */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open,
      onOpenChange,
      heading,
      description,
      children,
      hideCloseButton = false,
      disableOverlayClose = false,
      returnFocus = true,
      returnFocusRef,
      className,
      ...props
    },
    ref,
  ) => {
    const headingId = useId();
    const descriptionId = useId();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useModalFocus({
      open,
      containerRef: dialogRef,
      returnFocus,
      returnFocusRef,
    });

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
      <div className="lumen-dialog__portal">
        <div
          className="lumen-dialog__overlay"
          onClick={() => {
            if (!disableOverlayClose) {
              onOpenChange?.(false);
            }
          }}
        />
        <dialog
          ref={mergeRefs(ref, dialogRef)}
          open
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby={heading ? headingId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={cn("lumen-dialog", className)}
          {...props}
        >
          {!hideCloseButton && (
            <button
              type="button"
              className="lumen-dialog__close"
              aria-label="Close dialog"
              onClick={() => onOpenChange?.(false)}
            >
              ×
            </button>
          )}
          {(heading || description) && (
            <div className="lumen-dialog__header">
              {heading && (
                <h2 id={headingId} className="lumen-dialog__heading">
                  {heading}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="lumen-dialog__description">
                  {description}
                </p>
              )}
            </div>
          )}
          <div className="lumen-dialog__body">{children}</div>
        </dialog>
      </div>,
      document.body,
    );
  },
);

Dialog.displayName = "Dialog";
