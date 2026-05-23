import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    trigger: <Button variant="outline">Hover or focus</Button>,
    content: "Helpful supporting information.",
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "4rem", padding: "4rem" }}>
      <Tooltip trigger={<Button variant="outline">Top</Button>} content="Top tooltip" />
      <Tooltip
        trigger={<Button variant="outline">Right</Button>}
        content="Right tooltip"
        placement="right"
      />
      <Tooltip
        trigger={<Button variant="outline">Bottom</Button>}
        content="Bottom tooltip"
        placement="bottom"
      />
      <Tooltip
        trigger={<Button variant="outline">Left</Button>}
        content="Left tooltip"
        placement="left"
      />
    </div>
  ),
};
