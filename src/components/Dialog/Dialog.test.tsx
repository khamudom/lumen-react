import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
  it("does not render when closed", () => {
    render(<Dialog open={false} heading="Closed" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders labelled dialog content when open", () => {
    render(
      <Dialog open heading="Invite" description="Send an invite">
        Body
      </Dialog>,
    );

    expect(screen.getByRole("dialog", { name: "Invite" })).toHaveTextContent(
      "Body",
    );
    expect(screen.getByText("Send an invite")).toBeInTheDocument();
  });

  it("requests close from close button and Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Dialog open heading="Invite" onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole("button", { name: /close dialog/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});
