import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "./Toolbar";

const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar aria-label="Editor controls">
      <ToolbarGroup>
        <Button variant="ghost">Bold</Button>
        <Button variant="ghost">Italic</Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <Button variant="ghost">Link</Button>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Toolbar orientation="vertical" aria-label="Canvas controls">
      <ToolbarGroup>
        <Button variant="ghost">Select</Button>
        <Button variant="ghost">Move</Button>
      </ToolbarGroup>
      <ToolbarSeparator orientation="horizontal" />
      <ToolbarGroup>
        <Button variant="ghost">Zoom</Button>
      </ToolbarGroup>
    </Toolbar>
  ),
};
