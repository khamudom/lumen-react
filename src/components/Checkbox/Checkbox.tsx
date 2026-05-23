import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Checkbox.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label for the checkbox. */
  label?: ReactNode;
  /** Helper text shown below the label. */
  helperText?: string;
  /** Error message; sets aria-invalid when present. */
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error,
      className,
      id: idProp,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = idProp ?? generatedId;
    const helperId = helperText ? `${checkboxId}-helper` : undefined;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        className={cn(
          "lumen-checkbox-field",
          error && "lumen-checkbox-field--error",
          disabled && "lumen-checkbox-field--disabled",
          className,
        )}
      >
        <div className="lumen-checkbox-field__control-row">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="lumen-checkbox"
            {...props}
          />
          {label && (
            <label className="lumen-checkbox-field__label" htmlFor={checkboxId}>
              {label}
              {required && (
                <span className="lumen-checkbox-field__required" aria-hidden="true">
                  {" "}
                  *
                </span>
              )}
            </label>
          )}
        </div>
        {error && (
          <p id={errorId} className="lumen-checkbox-field__error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="lumen-checkbox-field__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
