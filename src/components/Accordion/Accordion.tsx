import {
  Children,
  cloneElement,
  createContext,
  type DetailsHTMLAttributes,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./Accordion.css";

interface AccordionContextValue {
  openValues: string[];
  collapsible: boolean;
  toggleValue: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Controlled item value. */
  value?: string;
  /** Initial item value for uncontrolled usage. */
  defaultValue?: string;
  /** Allows the open item to be closed. */
  collapsible?: boolean;
  /** Called when the open value changes. */
  onValueChange?: (value: string | undefined) => void;
}

export interface AccordionItemProps
  extends DetailsHTMLAttributes<HTMLDetailsElement> {
  children?: ReactNode;
  value: string;
}

export interface AccordionTriggerProps
  extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface AccordionItemChildProps {
  itemValue?: string;
  triggerId?: string;
  contentId?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      value,
      defaultValue,
      collapsible = false,
      onValueChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(
      defaultValue,
    );
    const currentValue = value ?? uncontrolledValue;

    const contextValue = useMemo<AccordionContextValue>(
      () => ({
        openValues: currentValue ? [currentValue] : [],
        collapsible,
        toggleValue: (nextValue) => {
          const isOpen = currentValue === nextValue;
          const newValue = isOpen && collapsible ? undefined : nextValue;

          if (value === undefined) {
            setUncontrolledValue(newValue);
          }

          onValueChange?.(newValue);
        },
      }),
      [collapsible, currentValue, onValueChange, value],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={cn("lumen-accordion", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = "Accordion";

export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = useContext(AccordionContext);
    const generatedId = useId();
    const triggerId = `${generatedId}-trigger`;
    const contentId = `${generatedId}-content`;
    const isOpen = context?.openValues.includes(value) ?? false;

    return (
      <details
        ref={ref}
        open={isOpen}
        className={cn("lumen-accordion__item", className)}
        data-value={value}
        {...props}
      >
        {Children.map(children, (child) => {
          if (!isValidElement<AccordionItemChildProps>(child)) {
            return child;
          }

          return cloneElement(child as ReactElement<AccordionItemChildProps>, {
            itemValue: value,
            triggerId,
            contentId,
          });
        })}
      </details>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  HTMLElement,
  AccordionTriggerProps & AccordionItemChildProps
>(
  (
    { itemValue, triggerId, contentId, className, children, onClick, ...props },
    ref,
  ) => {
    const context = useContext(AccordionContext);

    return (
      <summary
        ref={ref}
        id={triggerId}
        aria-controls={contentId}
        className={cn("lumen-accordion__trigger", className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && itemValue) {
            event.preventDefault();
            context?.toggleValue(itemValue);
          }
        }}
        {...props}
      >
        <span>{children}</span>
        <span className="lumen-accordion__icon" aria-hidden="true">
          +
        </span>
      </summary>
    );
  },
);

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps & AccordionItemChildProps
>(
  ({ itemValue, triggerId, contentId, className, children, ...props }, ref) => {
    void itemValue;

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn("lumen-accordion__content", className)}
        {...props}
      >
        <div className="lumen-accordion__content-inner">{children}</div>
      </div>
    );
  },
);

AccordionContent.displayName = "AccordionContent";
