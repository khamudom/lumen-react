import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
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
    triggerShape: {
      control: "radio",
      options: ["default", "circle"],
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

export const Circle: Story = {
  args: {
    trigger: (
      <Avatar>
        <AvatarImage
          src="https://api.dicebear.com/9.x/personas/svg?seed=Emery"
          alt="Account"
        />
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
    ),
    triggerShape: "circle",
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
