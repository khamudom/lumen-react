import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type DialogHTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { mergeRefs } from "../../utils/mergeRefs";
import { useModalFocus } from "../../utils/useModalFocus";
import "./AlertDialog.css";

export interface AlertDialogProps
  extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "title"> {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  cancelLabel?: ReactNode;
  actionLabel?: ReactNode;
  destructive?: boolean;
  onCancel?: () => void;
  onAction?: () => void;
  hideCancel?: boolean;
  /** Whether focus returns to the trigger when the dialog closes. @default true */
  returnFocus?: boolean;
  /** Element to receive focus when the dialog closes. Overrides the previously focused element. */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export const AlertDialog = forwardRef<HTMLDialogElement, AlertDialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      cancelLabel = "Cancel",
      actionLabel = "Continue",
      destructive = false,
      onCancel,
      onAction,
      hideCancel = false,
      returnFocus = true,
      returnFocusRef,
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();
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
          onCancel?.();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onCancel, onOpenChange, open]);

    if (!open) {
      return null;
    }

    return createPortal(
      <div className="lumen-alert-dialog__portal">
        <div className="lumen-alert-dialog__overlay" />
        <dialog
          ref={mergeRefs(ref, dialogRef)}
          open
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={cn("lumen-alert-dialog", className)}
          {...props}
        >
          {(title || description) && (
            <div className="lumen-alert-dialog__header">
              {title && (
                <h2 id={titleId} className="lumen-alert-dialog__title">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="lumen-alert-dialog__description">
                  {description}
                </p>
              )}
            </div>
          )}
          {children && <div className="lumen-alert-dialog__body">{children}</div>}
          <div className="lumen-alert-dialog__footer">
            {!hideCancel && (
              <button
                type="button"
                className="lumen-alert-dialog__button lumen-alert-dialog__button--cancel"
                onClick={() => {
                  onCancel?.();
                  onOpenChange?.(false);
                }}
              >
                {cancelLabel}
              </button>
            )}
            <button
              type="button"
              className={cn(
                "lumen-alert-dialog__button",
                destructive
                  ? "lumen-alert-dialog__button--destructive"
                  : "lumen-alert-dialog__button--action",
              )}
              onClick={() => {
                onAction?.();
                onOpenChange?.(false);
              }}
            >
              {actionLabel}
            </button>
          </div>
        </dialog>
      </div>,
      document.body,
    );
  },
);

AlertDialog.displayName = "AlertDialog";
