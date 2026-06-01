import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Banner, BannerDescription, BannerTitle } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: () => (
    <Banner>
      <BannerTitle>Heads up</BannerTitle>
      <BannerDescription>
        You can add components to your app using the CLI.
      </BannerDescription>
    </Banner>
  ),
};

export const Warning: Story = {
  render: () => (
    <Banner variant="warning">
      <BannerTitle>API preview mode</BannerTitle>
      <BannerDescription>API mock fallbacks disabled · prototype sections hidden</BannerDescription>
      <BannerDescription>
        Green &apos;Live API&apos; badges mark real World Cup API data. Toggle flags in
        src/config/dataSource.ts.
      </BannerDescription>
    </Banner>
  ),
};

export const Dismissible: Story = {
  render: function Dismissible() {
    const [open, setOpen] = useState(true);

    if (!open) {
      return <p style={{ padding: "1rem" }}>Banner dismissed. Refresh the story to reset.</p>;
    }

    return (
      <Banner variant="warning" onDismiss={() => setOpen(false)}>
        <BannerTitle>API preview mode</BannerTitle>
        <BannerDescription>API mock fallbacks disabled · prototype sections hidden</BannerDescription>
      </Banner>
    );
  },
};

export const Danger: Story = {
  render: () => (
    <Banner variant="danger">
      <BannerTitle>Service disruption</BannerTitle>
      <BannerDescription>
        Some features may be unavailable. We are working on a fix.
      </BannerDescription>
    </Banner>
  ),
};
