import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropdown, DropdownItem } from "./Dropdown";

describe("Dropdown", () => {
  it("opens when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dropdown trigger="Actions">
        <DropdownItem>Edit</DropdownItem>
      </Dropdown>,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await user.click(screen.getByText("Actions"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
  });

  it("closes after selecting an item", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Dropdown trigger="Actions" defaultOpen>
        <DropdownItem onClick={onClick}>Edit</DropdownItem>
      </Dropdown>,
    );

    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    render(
      <Dropdown trigger="Actions" open>
        <DropdownItem>Edit</DropdownItem>
      </Dropdown>,
    );

    expect(screen.getByText("Actions")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
