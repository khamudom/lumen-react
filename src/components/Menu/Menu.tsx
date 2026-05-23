import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./Menu.css";

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ className, children, ...props }, ref) => (
    <ul ref={ref} role="menu" className={cn("lumen-menu", className)} {...props}>
      {children}
    </ul>
  ),
);

Menu.displayName = "Menu";

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, children, type = "button", ...props }, ref) => (
    <li role="none" className="lumen-menu__item-shell">
      <button
        ref={ref}
        type={type}
        role="menuitem"
        className={cn("lumen-menu__item", className)}
        {...props}
      >
        {children}
      </button>
    </li>
  ),
);

MenuItem.displayName = "MenuItem";
