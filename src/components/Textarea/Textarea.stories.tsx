import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Multiline text input with label, helper text, error state, and accessible descriptions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Write your message...",
  },
};

export const WithHelper: Story = {
  args: {
    label: "Bio",
    helperText: "Keep it short and friendly.",
  },
};

export const WithError: Story = {
  args: {
    label: "Feedback",
    defaultValue: "Too short",
    error: "Please provide a little more detail.",
  },
};
