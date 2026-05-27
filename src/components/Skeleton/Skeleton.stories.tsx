import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton style={{ width: "12rem", height: "1rem" }} />,
};

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", width: "20rem" }}>
      <Skeleton style={{ width: "100%", height: "8rem" }} />
      <Skeleton style={{ width: "75%", height: "1rem" }} />
      <Skeleton style={{ width: "50%", height: "1rem" }} />
    </div>
  ),
};
