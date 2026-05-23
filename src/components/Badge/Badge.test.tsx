import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText("Active")).toHaveClass("lumen-badge--success");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Badge ref={ref}>Tag</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
