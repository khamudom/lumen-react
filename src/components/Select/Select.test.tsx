import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  it("renders select with label and options", () => {
    render(
      <Select
        label="Fruit"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ]}
      />,
    );
    expect(screen.getByLabelText("Fruit")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Select label="Fruit" error="Required" options={[]} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSelectElement | null };
    render(<Select ref={ref} label="Fruit" options={[]} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
