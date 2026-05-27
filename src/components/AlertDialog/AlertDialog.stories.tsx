import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../Button";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show dialog</Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Are you absolutely sure?"
          description="This action cannot be undone."
          actionLabel="Continue"
        />
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete account
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete account"
          description="This will permanently delete your account and remove your data."
          actionLabel="Delete"
          destructive
        />
      </>
    );
  },
};
