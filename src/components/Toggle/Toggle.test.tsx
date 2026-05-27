import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders as a button", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  it("calls onPressedChange when clicked", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(
      <Toggle aria-label="Toggle" onPressedChange={onPressedChange}>
        T
      </Toggle>,
    );
    await user.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(
      <Toggle ref={ref} aria-label="Toggle">
        T
      </Toggle>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
