import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./Collapsible.css";

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  contentId: string;
  triggerId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    { children, open, defaultOpen = false, onOpenChange, className, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const triggerId = `${generatedId}-trigger`;
    const contentId = `${generatedId}-content`;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = open ?? uncontrolledOpen;

    const contextValue = useMemo<CollapsibleContextValue>(
      () => ({
        open: isOpen,
        contentId,
        triggerId,
        toggle: () => {
          const nextOpen = !isOpen;
          if (open === undefined) {
            setUncontrolledOpen(nextOpen);
          }
          onOpenChange?.(nextOpen);
        },
      }),
      [contentId, isOpen, onOpenChange, open, triggerId],
    );

    return (
      <CollapsibleContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          className={cn("lumen-collapsible", className)}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);

Collapsible.displayName = "Collapsible";

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, children, onClick, ...props }, ref) => {
  const context = useContext(CollapsibleContext);

  return (
    <button
      ref={ref}
      id={context?.triggerId}
      type="button"
      aria-expanded={context?.open}
      aria-controls={context?.contentId}
      data-state={context?.open ? "open" : "closed"}
      className={cn("lumen-collapsible__trigger", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          context?.toggle();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(CollapsibleContext);

    if (!context?.open) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={context.contentId}
        role="region"
        aria-labelledby={context.triggerId}
        data-state={context.open ? "open" : "closed"}
        className={cn("lumen-collapsible__content", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CollapsibleContent.displayName = "CollapsibleContent";
