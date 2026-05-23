import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("renders title and description", () => {
    render(<Toast title="Saved" description="Changes were saved." />);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
    expect(screen.getByText("Changes were saved.")).toBeInTheDocument();
  });

  it("uses alert role for danger variant", () => {
    render(<Toast variant="danger" title="Failed" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
  });

  it("calls onClose from dismiss button", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast title="Saved" onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: /dismiss notification/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders an action", () => {
    render(<Toast title="Archived" action={<button type="button">Undo</button>} />);
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });
});
