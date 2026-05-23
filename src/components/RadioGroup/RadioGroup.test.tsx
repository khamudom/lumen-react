import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

describe("RadioGroup", () => {
  it("renders labelled radio options", () => {
    render(
      <RadioGroup aria-label="Shipping">
        <RadioGroupItem value="standard" label="Standard" />
        <RadioGroupItem value="express" label="Express" />
      </RadioGroup>,
    );

    expect(screen.getByRole("radiogroup", { name: "Shipping" })).toBeInTheDocument();
    expect(screen.getByLabelText("Standard")).toBeInTheDocument();
  });

  it("uses the default value", () => {
    render(
      <RadioGroup defaultValue="express" aria-label="Shipping">
        <RadioGroupItem value="standard" label="Standard" />
        <RadioGroupItem value="express" label="Express" />
      </RadioGroup>,
    );

    expect(screen.getByLabelText("Express")).toBeChecked();
  });

  it("updates selection and calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} aria-label="Shipping">
        <RadioGroupItem value="standard" label="Standard" />
        <RadioGroupItem value="express" label="Express" />
      </RadioGroup>,
    );

    await user.click(screen.getByLabelText("Express"));
    expect(onValueChange).toHaveBeenCalledWith("express");
    expect(screen.getByLabelText("Express")).toBeChecked();
  });

  it("associates helper text via aria-describedby", () => {
    render(
      <RadioGroup aria-label="Shipping">
        <RadioGroupItem
          value="standard"
          label="Standard"
          helperText="Arrives next week"
        />
      </RadioGroup>,
    );

    const radio = screen.getByLabelText("Standard");
    const helper = screen.getByText("Arrives next week");
    expect(radio).toHaveAttribute("aria-describedby", helper.id);
  });
});
