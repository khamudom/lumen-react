import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label for the input */
  label?: string;
  /** Helper text shown below the input */
  helperText?: string;
  /** Error message; sets aria-invalid when present */
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
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
    const inputId = idProp ?? generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        className={cn(
          "lumen-input-field",
          error && "lumen-input-field--error",
          disabled && "lumen-input-field--disabled",
          className,
        )}
      >
        {label && (
          <label className="lumen-input-field__label" htmlFor={inputId}>
            {label}
            {required && (
              <span className="lumen-input-field__required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="lumen-input"
          {...props}
        />
        {error && (
          <p id={errorId} className="lumen-input-field__error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="lumen-input-field__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
