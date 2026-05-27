import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./Pagination";

describe("Pagination", () => {
  it("renders navigation with active page", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Pagination ref={ref}>
        <PaginationContent />
      </Pagination>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
