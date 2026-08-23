import {
  createContext,
  type DetailsHTMLAttributes,
  forwardRef,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./Dropdown.css";

type DropdownAlign = "start" | "end";
export type DropdownTriggerShape = "default" | "circle";

interface DropdownContextValue {
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export interface DropdownProps extends DetailsHTMLAttributes<HTMLDetailsElement> {
  trigger: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: DropdownAlign;
  /** Shape of the trigger control. Use `circle` for avatar or icon menus. @default "default" */
  triggerShape?: DropdownTriggerShape;
}

export interface DropdownItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  closeOnSelect?: boolean;
}

export const Dropdown = forwardRef<HTMLDetailsElement, DropdownProps>(
  (
    {
      trigger,
      children,
      open,
      defaultOpen = false,
      onOpenChange,
      align = "start",
      triggerShape = "default",
      className,
      onToggle,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const menuId = useId();
    const isOpen = open ?? uncontrolledOpen;

    const setOpen = (nextOpen: boolean) => {
      if (open === undefined) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    };

    return (
      <DropdownContext.Provider value={{ close: () => setOpen(false) }}>
        <details
          ref={ref}
          open={isOpen}
          className={cn("lumen-dropdown", className)}
          data-open={isOpen || undefined}
          onToggle={(event) => {
            onToggle?.(event);
            const nextOpen = event.currentTarget.open;
            if (!event.defaultPrevented && nextOpen !== isOpen) {
              setOpen(nextOpen);
            }
          }}
          {...props}
        >
          <summary
            className={cn(
              "lumen-dropdown__trigger",
              triggerShape !== "default" && `lumen-dropdown__trigger--${triggerShape}`,
            )}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls={menuId}
          >
            {trigger}
          </summary>
          {isOpen && (
            <div
              id={menuId}
              role="menu"
              className={cn(
                "lumen-dropdown__content",
                `lumen-dropdown__content--${align}`,
              )}
            >
              {children}
            </div>
          )}
        </details>
      </DropdownContext.Provider>
    );
  },
);

Dropdown.displayName = "Dropdown";

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ children, closeOnSelect = true, className, onClick, type = "button", ...props }, ref) => {
    const context = useContext(DropdownContext);

    return (
      <button
        ref={ref}
        type={type}
        role="menuitem"
        className={cn("lumen-dropdown__item", className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && closeOnSelect) {
            context?.close();
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DropdownItem.displayName = "DropdownItem";
