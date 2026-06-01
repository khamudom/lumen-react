import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("does not render when closed", () => {
    render(<Drawer open={false} heading="Closed" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders on the left by default", () => {
    render(
      <Drawer open heading="Filters">
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog.parentElement).toHaveClass("lumen-drawer__surface--left");
  });

  it("renders on the right when right is true", () => {
    render(
      <Drawer open right heading="Filters">
        Content
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog.parentElement).toHaveClass("lumen-drawer__surface--right");
  });

  it("requests close from close button and Escape", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Drawer open heading="Filters" onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole("button", { name: /close drawer/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("returns focus to the trigger when closed", async () => {
    const user = userEvent.setup();

    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open drawer
          </button>
          <Drawer open={open} onOpenChange={setOpen} heading="Filters" />
        </>
      );
    }

    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open drawer" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: /close drawer/i }));
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });
});
