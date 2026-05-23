import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders navigation with a default label", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("marks the current item", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem current>Components</BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByText("Components")).toHaveAttribute("aria-current", "page");
  });

  it("renders links and custom separators", () => {
    render(
      <Breadcrumb label="Path">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
        </BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByText("›")).toHaveAttribute("aria-hidden", "true");
  });
});
