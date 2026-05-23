import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import "./Textarea.css";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label for the textarea. */
  label?: string;
  /** Helper text shown below the textarea. */
  helperText?: string;
  /** Error message; sets aria-invalid when present. */
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    const textareaId = idProp ?? generatedId;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;
    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        className={cn(
          "lumen-textarea-field",
          error && "lumen-textarea-field--error",
          disabled && "lumen-textarea-field--disabled",
          className,
        )}
      >
        {label && (
          <label className="lumen-textarea-field__label" htmlFor={textareaId}>
            {label}
            {required && (
              <span className="lumen-textarea-field__required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="lumen-textarea"
          {...props}
        />
        {error && (
          <p id={errorId} className="lumen-textarea-field__error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="lumen-textarea-field__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
