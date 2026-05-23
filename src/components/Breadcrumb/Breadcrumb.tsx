import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import "./Breadcrumb.css";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  label?: string;
}

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
  current?: boolean;
}

export interface BreadcrumbLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  current?: boolean;
}

export interface BreadcrumbSeparatorProps
  extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, label = "Breadcrumb", ...props }, ref) => (
    <nav
      ref={ref}
      aria-label={label}
      className={cn("lumen-breadcrumb", className)}
      {...props}
    >
      <ol className="lumen-breadcrumb__list">{children}</ol>
    </nav>
  ),
);

Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, current = false, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("lumen-breadcrumb__item", className)}
      aria-current={current ? "page" : undefined}
      {...props}
    >
      {children}
    </li>
  ),
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, children, current = false, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("lumen-breadcrumb__link", className)}
    aria-current={current ? "page" : undefined}
    {...props}
  >
    {children}
  </a>
));

BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbSeparator = forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, children = "/", ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn("lumen-breadcrumb__separator", className)}
    {...props}
  >
    {children}
  </span>
));

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
