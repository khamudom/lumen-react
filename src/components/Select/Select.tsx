import {
  forwardRef,
  useId,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
  options?: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      placeholder,
      options,
      className,
      id: idProp,
      disabled,
      required,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const selectId = idProp ?? generatedId;
    const helperId = helperText ? `${selectId}-helper` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        className={cn(
          "lumen-select-field",
          error && "lumen-select-field--error",
          disabled && "lumen-select-field--disabled",
          className,
        )}
      >
        {label && (
          <label className="lumen-select-field__label" htmlFor={selectId}>
            {label}
            {required && (
              <span className="lumen-select-field__required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="lumen-select"
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <p id={errorId} className="lumen-select-field__error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="lumen-select-field__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
