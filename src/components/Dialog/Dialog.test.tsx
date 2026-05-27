import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
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

  it("moves focus into the dialog when opened", async () => {
    const user = userEvent.setup();

    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open dialog
          </button>
          <Dialog open={open} onOpenChange={setOpen} heading="Invite" />
        </>
      );
    }

    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close dialog/i })).toHaveFocus();
    });
  });

  it("returns focus to the trigger when closed", async () => {
    const user = userEvent.setup();

    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open dialog
          </button>
          <Dialog open={open} onOpenChange={setOpen} heading="Invite" />
        </>
      );
    }

    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open dialog" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: /close dialog/i }));
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it("does not restore focus when returnFocus is false", async () => {
    const user = userEvent.setup();

    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open dialog
          </button>
          <Dialog
            open={open}
            onOpenChange={setOpen}
            heading="Invite"
            returnFocus={false}
          />
        </>
      );
    }

    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open dialog" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: /close dialog/i }));
    expect(trigger).not.toHaveFocus();
  });
});
