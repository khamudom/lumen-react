import {
  createContext,
  type FieldsetHTMLAttributes,
  forwardRef,
  useContext,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./RadioGroup.css";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  disabled?: boolean;
  setValue: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: string) => void;
}

export interface RadioGroupItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name"> {
  value: string;
  label?: ReactNode;
  helperText?: string;
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      children,
      value,
      defaultValue,
      name,
      disabled,
      orientation = "vertical",
      onValueChange,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId();
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = value ?? uncontrolledValue;

    const setValue = (nextValue: string) => {
      if (value === undefined) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name: name ?? generatedName,
          value: currentValue,
          disabled,
          setValue,
        }}
      >
        <fieldset
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          disabled={disabled}
          className={cn(
            "lumen-radio-group",
            `lumen-radio-group--${orientation}`,
            disabled && "lumen-radio-group--disabled",
            className,
          )}
          {...props}
        >
          {children}
        </fieldset>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(
  (
    {
      value,
      label,
      helperText,
      className,
      id: idProp,
      disabled,
      checked,
      onChange,
      ...props
    },
    ref,
  ) => {
    const context = useContext(RadioGroupContext);
    const generatedId = useId();
    const radioId = idProp ?? generatedId;
    const helperId = helperText ? `${radioId}-helper` : undefined;
    const isDisabled = disabled || context?.disabled;

    return (
      <div className={cn("lumen-radio-group__item", className)}>
        <input
          ref={ref}
          id={radioId}
          type="radio"
          name={context?.name}
          value={value}
          checked={context ? context.value === value : checked}
          disabled={isDisabled}
          aria-describedby={helperId}
          className="lumen-radio-group__input"
          onChange={(event) => {
            onChange?.(event);
            if (!event.defaultPrevented && event.currentTarget.checked) {
              context?.setValue(value);
            }
          }}
          {...props}
        />
        {label && (
          <label className="lumen-radio-group__label" htmlFor={radioId}>
            {label}
          </label>
        )}
        {helperText && (
          <p id={helperId} className="lumen-radio-group__helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

RadioGroupItem.displayName = "RadioGroupItem";
