import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownItem } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "radio",
      options: ["start", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    trigger: "Actions",
    children: (
      <>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
        <DropdownItem>Archive</DropdownItem>
      </>
    ),
  },
};

export const Open: Story = {
  args: {
    trigger: "Account",
    defaultOpen: true,
    align: "end",
    children: (
      <>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Billing</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </>
    ),
  },
};
