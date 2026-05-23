import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "./Toolbar";

describe("Toolbar", () => {
  it("renders a labelled toolbar", () => {
    render(
      <Toolbar aria-label="Editor controls">
        <button type="button">Bold</button>
      </Toolbar>,
    );

    expect(
      screen.getByRole("toolbar", { name: "Editor controls" }),
    ).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renders groups and separators", () => {
    render(
      <Toolbar>
        <ToolbarGroup>
          <button type="button">Bold</button>
        </ToolbarGroup>
        <ToolbarSeparator />
      </Toolbar>,
    );

    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });

  it("supports vertical orientation", () => {
    render(<Toolbar orientation="vertical" aria-label="Tools" />);
    expect(screen.getByRole("toolbar", { name: "Tools" })).toHaveClass(
      "lumen-toolbar--vertical",
    );
  });
});
