import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Primary action control with variants, loading state, and icon support. Theme via `--lumen-button-*` CSS variables.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    iconPosition: { control: "radio", options: ["start", "end"] },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
};

export const Destructive: Story = {
  args: { children: "Delete", variant: "destructive" },
};

export const Loading: Story = {
  args: { children: "Saving…", loading: true },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const FullWidth: Story = {
  args: { children: "Full width", fullWidth: true },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    children: "Download",
    icon: <span aria-hidden="true">↓</span>,
    iconPosition: "start",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button>Keyboard focusable (Tab)</Button>
      <Button loading aria-label="Submitting form">
        Submit
      </Button>
      <Button disabled>Disabled action</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons expose native focus, `aria-busy` when loading, and `disabled` for inactive actions.",
      },
    },
  },
};

export const CustomTheme: Story = {
  render: () => (
    <Button className="my-custom-button" variant="primary">
      Custom themed
    </Button>
  ),
  decorators: [
    (Story) => (
      <>
        <style>{`
          .my-custom-button {
            --lumen-button-bg: #7c3aed;
            --lumen-button-color: #fff;
          }
        `}</style>
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Override component tokens on a wrapper or class.",
      },
    },
  },
};
