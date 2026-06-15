import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeAppearance, type BadgeVariant } from "./Badge";

const variants: BadgeVariant[] = [
  "default",
  "primary",
  "success",
  "danger",
  "warning",
];

const appearances: BadgeAppearance[] = ["filled", "tint", "outline", "ghost"];

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Compact label for status, categories, and counts.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    appearance: {
      control: "select",
      options: appearances,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Draft" },
};

export const Primary: Story = {
  args: { children: "Featured", variant: "primary" },
};

export const SuccessTint: Story = {
  args: { children: "Active", variant: "success", appearance: "tint" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const AllAppearances: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {appearances.map((appearance) => (
        <div
          key={appearance}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}
        >
          <span style={{ width: "4rem", fontSize: "0.75rem", color: "#71717a" }}>
            {appearance}
          </span>
          {variants.map((variant) => (
            <Badge key={variant} variant={variant} appearance={appearance}>
              {variant}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ fontWeight: 500 }}>Project Alpha</span>
      <Badge variant="success" appearance="tint">
        Live
      </Badge>
    </div>
  ),
};
