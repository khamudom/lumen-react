import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("does not render when closed", () => {
    render(<Drawer open={false} heading="Closed" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders with the selected side class", () => {
    render(
      <Drawer open side="left" heading="Filters">
        Content
      </Drawer>,
    );

    expect(screen.getByRole("dialog", { name: "Filters" })).toHaveClass(
      "lumen-drawer--left",
    );
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
});
