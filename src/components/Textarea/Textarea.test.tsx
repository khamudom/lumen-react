import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders with label", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("associates helper text via aria-describedby", () => {
    render(<Textarea label="Bio" helperText="Keep it short" />);
    const textarea = screen.getByLabelText("Bio");
    const helper = screen.getByText("Keep it short");
    expect(textarea).toHaveAttribute("aria-describedby", helper.id);
  });

  it("sets aria-invalid when error is present", () => {
    render(<Textarea label="Feedback" error="Required" />);
    expect(screen.getByLabelText("Feedback")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea label="Message" onChange={onChange} />);

    await user.type(screen.getByLabelText("Message"), "Hello");
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByLabelText("Message")).toHaveValue("Hello");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea ref={ref} label="Field" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
