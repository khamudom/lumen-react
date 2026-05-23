import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Composable surface for grouping dashboard content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Total users</CardTitle>
        <CardDescription>Compared to last month</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>2,847</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">View report</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive style={{ maxWidth: 360, cursor: "pointer" }}>
      <CardHeader>
        <CardTitle>Clickable card</CardTitle>
        <CardDescription>Hover for elevated shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>Use for navigational tiles in dashboards.</p>
      </CardContent>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardContent>
        <p style={{ margin: 0 }}>Minimal card with content only.</p>
      </CardContent>
    </Card>
  ),
};
