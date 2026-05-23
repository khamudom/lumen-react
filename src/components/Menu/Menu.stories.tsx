import type { Meta, StoryObj } from "@storybook/react";
import { Menu, MenuItem } from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu aria-label="Document actions">
      <MenuItem>Rename</MenuItem>
      <MenuItem>Move</MenuItem>
      <MenuItem disabled>Delete</MenuItem>
    </Menu>
  ),
};
