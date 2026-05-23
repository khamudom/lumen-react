import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Switch.css";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label for the switch. */
  label?: ReactNode;
  /** Helper text shown below the label. */
  helperText?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      helperText,
      className,
      id: idProp,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = idProp ?? generatedId;
    const helperId = helperText ? `${switchId}-helper` : undefined;

    return (
      <div
        className={cn(
          "lumen-switch-field",
          disabled && "lumen-switch-field--disabled",
          className,
        )}
      >
        <div className="lumen-switch-field__control-row">
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            required={required}
            aria-describedby={helperId}
            className="lumen-switch"
            {...props}
          />
          {label && (
            <label className="lumen-switch-field__label" htmlFor={switchId}>
              {label}
              {required && (
                <span className="lumen-switch-field__required" aria-hidden="true">
                  {" "}
                  *
                </span>
              )}
            </label>
          )}
        </div>
        {helperText && (
          <p id={helperId} className="lumen-switch-field__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
