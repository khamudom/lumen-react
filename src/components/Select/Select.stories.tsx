import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

export const Default: Story = {
  args: {
    label: "Fruit",
    placeholder: "Select a fruit",
    options,
  },
};

export const WithHelper: Story = {
  args: {
    label: "Fruit",
    options,
    defaultValue: "apple",
    helperText: "Choose your favorite fruit.",
  },
};
