import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Menu, MenuItem } from "./Menu";

describe("Menu", () => {
  it("renders a menu with menu items", () => {
    render(
      <Menu aria-label="Actions">
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>,
    );

    expect(screen.getByRole("menu", { name: "Actions" })).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
  });

  it("calls item click handlers", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Menu>
        <MenuItem onClick={onClick}>Edit</MenuItem>
      </Menu>,
    );

    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
