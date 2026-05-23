import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./Tooltip.css";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  trigger: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  (
    {
      trigger,
      content,
      placement = "top",
      className,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const tooltipId = useId();

    return (
      <span
        ref={ref}
        className={cn("lumen-tooltip", className)}
        onBlur={(event) => {
          onBlur?.(event);
          setOpen(false);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          setOpen(true);
        }}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          setOpen(true);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          setOpen(false);
        }}
        {...props}
      >
        <span className="lumen-tooltip__trigger" aria-describedby={tooltipId}>
          {trigger}
        </span>
        <span
          id={tooltipId}
          role="tooltip"
          className={cn("lumen-tooltip__content", `lumen-tooltip__content--${placement}`)}
          data-open={open || undefined}
        >
          {content}
        </span>
      </span>
    );
  },
);

Tooltip.displayName = "Tooltip";
