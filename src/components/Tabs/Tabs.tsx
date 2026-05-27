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
import "./Tabs.css";

interface TabsContextValue {
  value?: string;
  setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  value: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { children, value, defaultValue, onValueChange, className, ...props },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = value ?? uncontrolledValue;

    const contextValue = useMemo<TabsContextValue>(
      () => ({
        value: currentValue,
        setValue: (nextValue) => {
          if (value === undefined) {
            setUncontrolledValue(nextValue);
          }
          onValueChange?.(nextValue);
        },
      }),
      [currentValue, onValueChange, value],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={cn("lumen-tabs", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = "Tabs";

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn("lumen-tabs__list", className)}
      {...props}
    >
      {children}
    </div>
  ),
);

TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, disabled, onClick, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isSelected = context?.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        disabled={disabled}
        aria-selected={isSelected}
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "lumen-tabs__trigger",
          isSelected && "lumen-tabs__trigger--active",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled) {
            context?.setValue(value);
          }
        }}
        {...props}
      />
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children, value, ...props }, ref) => {
    const context = useContext(TabsContext);
    const generatedId = useId();
    const isSelected = context?.value === value;

    if (!isSelected) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={generatedId}
        role="tabpanel"
        className={cn("lumen-tabs__content", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TabsContent.displayName = "TabsContent";
