import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text input with label, helper text, and error states. Accessible via `aria-invalid` and `aria-describedby`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithHelper: Story = {
  args: {
    label: "Username",
    helperText: "3–20 characters, letters and numbers only.",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    defaultValue: "not-an-email",
    error: "Enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "API key",
    defaultValue: "sk-••••••••",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Name",
    required: true,
    placeholder: "Jane Doe",
  },
};

export const Accessibility: Story = {
  render: () => (
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 320 }}>
      <Input label="Email" type="email" required helperText="We'll never share your email." />
      <Input label="Password" type="password" error="Password must be at least 8 characters." />
    </form>
  ),
};
