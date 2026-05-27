import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label htmlFor="name">Name</Label>);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("applies disabled class", () => {
    render(<Label disabled>Disabled</Label>);
    expect(screen.getByText("Disabled")).toHaveClass("lumen-label--disabled");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLLabelElement | null };
    render(<Label ref={ref}>Field</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
