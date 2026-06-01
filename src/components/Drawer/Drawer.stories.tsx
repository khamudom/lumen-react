import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    right: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
          {...args}
          open={open}
          onOpenChange={setOpen}
          heading="Filters"
          description="Refine the visible results."
        >
          <p>Drawer content can contain navigation, forms, or contextual panels.</p>
        </Drawer>
      </>
    );
  },
};

export const Right: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open right drawer</Button>
        <Drawer
          {...args}
          open={open}
          onOpenChange={setOpen}
          heading="Details"
        >
          Use right drawers for detail panels or secondary actions.
        </Drawer>
      </>
    );
  },
  args: {
    right: true,
  },
};
