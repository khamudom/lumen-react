import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
  it("renders title and actions when open", () => {
    render(
      <AlertDialog
        open
        title="Confirm action"
        description="Are you sure?"
        actionLabel="Confirm"
        cancelLabel="Cancel"
      />,
    );
    expect(screen.getByText("Confirm action")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("calls onAction and closes", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <AlertDialog
        open
        title="Confirm"
        actionLabel="Continue"
        onAction={onAction}
        onOpenChange={onOpenChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDialogElement | null };
    render(<AlertDialog ref={ref} open title="Title" />);
    expect(ref.current).toBeInstanceOf(HTMLDialogElement);
  });
});
