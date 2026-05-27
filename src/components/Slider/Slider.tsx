import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Slider.css";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      error,
      className,
      id: idProp,
      disabled,
      required,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const sliderId = idProp ?? generatedId;
    const helperId = helperText ? `${sliderId}-helper` : undefined;
    const errorId = error ? `${sliderId}-error` : undefined;
    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        className={cn(
          "lumen-slider-field",
          error && "lumen-slider-field--error",
          disabled && "lumen-slider-field--disabled",
          className,
        )}
      >
        {label && (
          <label className="lumen-slider-field__label" htmlFor={sliderId}>
            {label}
            {required && (
              <span className="lumen-slider-field__required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="lumen-slider"
          {...props}
        />
        {error && (
          <p id={errorId} className="lumen-slider-field__error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="lumen-slider-field__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Slider.displayName = "Slider";
