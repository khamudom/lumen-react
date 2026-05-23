import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: "Project saved",
    description: "Your changes are now available to collaborators.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Invite sent",
    description: "Your teammate will receive an email shortly.",
  },
};

export const WithAction: Story = {
  args: {
    title: "Undo archive?",
    description: "The document was moved to archive.",
    action: <Button variant="outline">Undo</Button>,
  },
};
