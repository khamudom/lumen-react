import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="standard" aria-label="Shipping speed">
      <RadioGroupItem
        value="standard"
        label="Standard"
        helperText="Arrives in 5-7 business days."
      />
      <RadioGroupItem
        value="express"
        label="Express"
        helperText="Arrives in 2-3 business days."
      />
      <RadioGroupItem value="overnight" label="Overnight" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup orientation="horizontal" defaultValue="small" aria-label="Size">
      <RadioGroupItem value="small" label="Small" />
      <RadioGroupItem value="medium" label="Medium" />
      <RadioGroupItem value="large" label="Large" />
    </RadioGroup>
  ),
};
