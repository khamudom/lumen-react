import {
  type DialogHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
  type TransitionEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { restoreFocus } from "../../utils/focus";
import { mergeRefs } from "../../utils/mergeRefs";
import { useModalFocus } from "../../utils/useModalFocus";
import "./Drawer.css";

export interface DrawerProps extends DialogHTMLAttributes<HTMLDialogElement> {
  /** Whether the drawer is visible. */
  open: boolean;
  /** Called when the drawer requests to close. */
  onOpenChange?: (open: boolean) => void;
  /** When true, the drawer slides in from the right. Defaults to the left side. */
  right?: boolean;
  /** Accessible drawer heading. */
  heading?: ReactNode;
  /** Optional supporting description. */
  description?: ReactNode;
  children?: ReactNode;
  hideCloseButton?: boolean;
  disableOverlayClose?: boolean;
  /** Whether focus returns to the trigger when the drawer closes. @default true */
  returnFocus?: boolean;
  /** Element to receive focus when the drawer closes. Overrides the previously focused element. */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export const Drawer = forwardRef<HTMLDialogElement, DrawerProps>(
  (
    {
      open,
      onOpenChange,
      right = false,
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
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);
    const wasPresentRef = useRef(false);
    const [isPresent, setIsPresent] = useState(open);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (open) {
        setIsPresent(true);
        setIsVisible(false);
        return undefined;
      }

      setIsVisible(false);
      return undefined;
    }, [open]);

    useLayoutEffect(() => {
      if (!isPresent || !open || isVisible) {
        return undefined;
      }

      let frame2 = 0;
      const frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });

      return () => {
        cancelAnimationFrame(frame1);
        if (frame2) {
          cancelAnimationFrame(frame2);
        }
      };
    }, [isPresent, isVisible, open]);

    useEffect(() => {
      if (open || !isPresent || isVisible) {
        return undefined;
      }

      const timeout = window.setTimeout(() => {
        setIsPresent(false);
      }, 200);

      return () => window.clearTimeout(timeout);
    }, [isPresent, isVisible, open]);

    const handleDrawerTransitionEnd = (event: TransitionEvent<HTMLDialogElement>) => {
      if (event.propertyName !== "transform" || open) {
        return;
      }

      setIsPresent(false);
    };

    useLayoutEffect(() => {
      if (isPresent && open && !isVisible) {
        previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      }
    }, [isPresent, isVisible, open]);

    useModalFocus({
      open: isPresent && open && isVisible,
      containerRef: dialogRef,
      returnFocus: false,
    });

    useEffect(() => {
      if (isPresent) {
        wasPresentRef.current = true;
        return;
      }

      if (!wasPresentRef.current) {
        return;
      }

      wasPresentRef.current = false;

      if (!returnFocus) {
        return;
      }

      restoreFocus(returnFocusRef?.current ?? previouslyFocusedRef.current);
    }, [isPresent, returnFocus, returnFocusRef]);

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

    if (!isPresent) {
      return null;
    }

    return createPortal(
      <div
        className={cn(
          "lumen-drawer__portal",
          isVisible && "lumen-drawer__portal--visible",
        )}
      >
        <div
          className="lumen-drawer__overlay"
          onClick={() => {
            if (!disableOverlayClose) {
              onOpenChange?.(false);
            }
          }}
        />
        <div
          className={cn(
            "lumen-drawer__surface",
            right ? "lumen-drawer__surface--right" : "lumen-drawer__surface--left",
          )}
        >
          <dialog
            ref={mergeRefs(ref, dialogRef)}
            open
            tabIndex={-1}
            aria-modal="true"
            aria-labelledby={heading ? headingId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              "lumen-drawer",
              isVisible && "lumen-drawer--visible",
              className,
            )}
            onTransitionEnd={handleDrawerTransitionEnd}
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
        </div>
      </div>,
      document.body,
    );
  },
);

Drawer.displayName = "Drawer";
