import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders range input with label", () => {
    render(<Slider label="Volume" defaultValue={50} />);
    expect(screen.getByLabelText("Volume")).toHaveAttribute("type", "range");
  });

  it("shows error message", () => {
    render(<Slider label="Volume" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Slider ref={ref} label="Volume" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
