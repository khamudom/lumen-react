import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
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
  args: {
    side: "right",
  },
};

export const Left: Story = {
  args: {
    open: true,
    side: "left",
    heading: "Navigation",
    children: "Use left drawers for app navigation or secondary content.",
  },
};
