import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Pagination.css";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface PaginationContentProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode;
}

export interface PaginationItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode;
}

export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  isActive?: boolean;
}

export type PaginationPreviousProps = PaginationLinkProps;

export type PaginationNextProps = PaginationLinkProps;

export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cn("lumen-pagination", className)}
      {...props}
    >
      {children}
    </nav>
  ),
);

Pagination.displayName = "Pagination";

export const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, children, ...props }, ref) => (
    <ul ref={ref} className={cn("lumen-pagination__content", className)} {...props}>
      {children}
    </ul>
  ),
);

PaginationContent.displayName = "PaginationContent";

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={cn("lumen-pagination__item", className)} {...props}>
      {children}
    </li>
  ),
);

PaginationItem.displayName = "PaginationItem";

export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, children, isActive, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "lumen-pagination__link",
        isActive && "lumen-pagination__link--active",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
);

PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(({ className, children = "Previous", ...props }, ref) => (
  <PaginationLink
    ref={ref}
    className={cn("lumen-pagination__link", "lumen-pagination__link--nav", className)}
    {...props}
  >
    {children}
  </PaginationLink>
));

PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ className, children = "Next", ...props }, ref) => (
    <PaginationLink
      ref={ref}
      className={cn("lumen-pagination__link", "lumen-pagination__link--nav", className)}
      {...props}
    >
      {children}
    </PaginationLink>
  ),
);

PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn("lumen-pagination__ellipsis", className)}
    {...props}
  >
    …
    <span className="lumen-sr-only">More pages</span>
  </span>
));

PaginationEllipsis.displayName = "PaginationEllipsis";
