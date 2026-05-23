import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Native checkbox with label, helper text, error state, and ref forwarding.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Subscribe to updates",
  },
};

export const Checked: Story = {
  args: {
    label: "Email me product news",
    defaultChecked: true,
  },
};

export const WithHelper: Story = {
  args: {
    label: "Remember this device",
    helperText: "Only use this on trusted devices.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms before continuing.",
    required: true,
  },
};
