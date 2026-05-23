import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal dialog rendered in a portal with labelled heading, description, and close affordances.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          heading="Invite teammate"
          description="Send an invitation to collaborate in your workspace."
        >
          <p>Use this area for form fields, summaries, or confirmation copy.</p>
        </Dialog>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  args: {
    open: true,
    hideCloseButton: true,
    heading: "Persistent dialog",
    description: "This dialog only closes when controlled by the parent.",
    children: "Overlay and escape handling can be disabled or managed externally.",
  },
};
