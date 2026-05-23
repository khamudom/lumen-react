import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Toolbar.css";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  orientation?: "horizontal" | "vertical";
}

export interface ToolbarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ToolbarSeparatorProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, children, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      aria-orientation={orientation}
      className={cn("lumen-toolbar", `lumen-toolbar--${orientation}`, className)}
      {...props}
    >
      {children}
    </div>
  ),
);

Toolbar.displayName = "Toolbar";

export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("lumen-toolbar__group", className)} {...props}>
      {children}
    </div>
  ),
);

ToolbarGroup.displayName = "ToolbarGroup";

export const ToolbarSeparator = forwardRef<
  HTMLHRElement,
  ToolbarSeparatorProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <hr
    ref={ref}
    aria-orientation={orientation}
    className={cn(
      "lumen-toolbar__separator",
      `lumen-toolbar__separator--${orientation}`,
      className,
    )}
    {...props}
  />
));

ToolbarSeparator.displayName = "ToolbarSeparator";
