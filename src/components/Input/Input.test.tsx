import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("associates helper text via aria-describedby", () => {
    render(<Input label="Name" helperText="Your display name" />);
    const input = screen.getByLabelText("Name");
    const helper = screen.getByText("Your display name");
    expect(input).toHaveAttribute("aria-describedby", helper.id);
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Search" onChange={onChange} />);
    await user.type(screen.getByLabelText("Search"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} label="Field" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
