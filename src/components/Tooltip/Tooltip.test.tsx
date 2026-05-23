import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders trigger and tooltip content", () => {
    render(<Tooltip trigger={<button type="button">Info</button>} content="Details" />);
    expect(screen.getByRole("button", { name: "Info" })).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Details");
  });

  it("opens on hover and closes on unhover", async () => {
    const user = userEvent.setup();
    render(<Tooltip trigger={<button type="button">Info</button>} content="Details" />);

    const wrapper = screen.getByText("Info").closest(".lumen-tooltip");
    expect(screen.getByRole("tooltip")).not.toHaveAttribute("data-open");

    await user.hover(wrapper as HTMLElement);
    expect(screen.getByRole("tooltip")).toHaveAttribute("data-open", "true");

    await user.unhover(wrapper as HTMLElement);
    expect(screen.getByRole("tooltip")).not.toHaveAttribute("data-open");
  });

  it("applies placement class", () => {
    render(
      <Tooltip
        trigger={<button type="button">Info</button>}
        content="Details"
        placement="right"
      />,
    );

    expect(screen.getByRole("tooltip")).toHaveClass(
      "lumen-tooltip__content--right",
    );
  });
});
