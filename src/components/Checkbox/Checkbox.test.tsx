import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });

  it("associates helper text via aria-describedby", () => {
    render(<Checkbox label="Remember me" helperText="Only on trusted devices" />);
    const checkbox = screen.getByLabelText("Remember me");
    const helper = screen.getByText("Only on trusted devices");
    expect(checkbox).toHaveAttribute("aria-describedby", helper.id);
  });

  it("sets aria-invalid when error is present", () => {
    render(<Checkbox label="Accept terms" error="Required" />);
    expect(screen.getByLabelText("Accept terms")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("handles user changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Notify me" onChange={onChange} />);

    await user.click(screen.getByLabelText("Notify me"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Notify me")).toBeChecked();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Checkbox ref={ref} label="Field" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
