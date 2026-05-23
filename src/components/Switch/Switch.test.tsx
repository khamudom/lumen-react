import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with label and switch role", () => {
    render(<Switch label="Enable notifications" />);
    expect(
      screen.getByRole("switch", { name: "Enable notifications" }),
    ).toBeInTheDocument();
  });

  it("associates helper text via aria-describedby", () => {
    render(<Switch label="Dark mode" helperText="Applies to this device" />);
    const switchControl = screen.getByRole("switch", { name: "Dark mode" });
    const helper = screen.getByText("Applies to this device");
    expect(switchControl).toHaveAttribute("aria-describedby", helper.id);
  });

  it("handles user changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Enable notifications" onChange={onChange} />);

    await user.click(screen.getByRole("switch", { name: "Enable notifications" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeChecked();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Switch ref={ref} label="Field" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
