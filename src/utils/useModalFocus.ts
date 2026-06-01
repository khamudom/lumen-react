import { type RefObject, useLayoutEffect, useRef } from "react";
import { focusFirstFocusable, restoreFocus, trapTabKey } from "./focus";

export interface UseModalFocusOptions {
  open: boolean;
  containerRef: RefObject<HTMLElement | null>;
  returnFocus?: boolean;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function useModalFocus({
  open,
  containerRef,
  returnFocus = true,
  returnFocusRef,
}: UseModalFocusOptions) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      return undefined;
    }

    const returnFocusElement = returnFocusRef?.current ?? null;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    if (containerRef.current) {
      focusFirstFocusable(containerRef.current);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current) {
        return;
      }

      trapTabKey(event, containerRef.current);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (!returnFocus) {
        return;
      }

      const focusTarget = returnFocusElement ?? previouslyFocusedRef.current;
      restoreFocus(focusTarget);
    };
  }, [containerRef, open, returnFocus, returnFocusRef]);
}
