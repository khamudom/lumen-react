import { forwardRef, useState, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Toggle.css";

export type ToggleVariant = "default" | "outline";

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Controlled pressed state */
  pressed?: boolean;
  /** Initial pressed state for uncontrolled usage */
  defaultPressed?: boolean;
  /** Called when pressed state changes */
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      pressed,
      defaultPressed = false,
      onPressedChange,
      variant = "default",
      type = "button",
      onClick,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
    const isPressed = pressed ?? uncontrolledPressed;

    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        className={cn(
          "lumen-toggle",
          `lumen-toggle--${variant}`,
          isPressed && "lumen-toggle--pressed",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            const nextPressed = !isPressed;
            if (pressed === undefined) {
              setUncontrolledPressed(nextPressed);
            }
            onPressedChange?.(nextPressed);
          }
        }}
        {...props}
      />
    );
  },
);

Toggle.displayName = "Toggle";
