import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

describe("Accordion", () => {
  it("opens the default item", () => {
    render(
      <Accordion defaultValue="one">
        <AccordionItem value="one">
          <AccordionTrigger>One</AccordionTrigger>
          <AccordionContent>First panel</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("One").closest("details")).toHaveAttribute("open");
    expect(screen.getByText("First panel")).not.toHaveAttribute("hidden");
  });

  it("toggles an item and calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Accordion collapsible onValueChange={onValueChange}>
        <AccordionItem value="one">
          <AccordionTrigger>One</AccordionTrigger>
          <AccordionContent>First panel</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(screen.getByText("One"));
    expect(onValueChange).toHaveBeenCalledWith("one");
    expect(screen.getByText("One").closest("details")).toHaveAttribute("open");

    await user.click(screen.getByText("One"));
    expect(onValueChange).toHaveBeenLastCalledWith(undefined);
  });
});
