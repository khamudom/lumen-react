import type { CSSProperties, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "../components/Alert";
import { Badge } from "../components/Badge";
import { Banner, BannerDescription, BannerTitle } from "../components/Banner";
import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Checkbox } from "../components/Checkbox";
import { Input } from "../components/Input";
import { Progress } from "../components/Progress";
import { Separator } from "../components/Separator";
import { Switch } from "../components/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs";
import type { ResolvedTheme } from "./types";

const panelStyle: CSSProperties = {
  flex: "1 1 320px",
  minWidth: "280px",
  padding: "1.5rem",
  borderRadius: "var(--lumen-radius-lg)",
  border: "1px solid var(--lumen-color-border)",
  backgroundColor: "var(--lumen-color-background)",
  color: "var(--lumen-color-text)",
};

function ThemePanel({
  theme,
  title,
  children,
}: {
  theme: ResolvedTheme;
  title: string;
  children: ReactNode;
}) {
  const isDark = theme === "dark";

  return (
    <section
      className={isDark ? "lumen-dark" : undefined}
      data-lumen-theme={theme}
      style={panelStyle}
    >
      <h2
        style={{
          margin: "0 0 1rem",
          fontSize: "var(--lumen-font-size-lg)",
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function ComponentSamples() {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account settings</CardTitle>
          <CardDescription>Manage your profile and preferences.</CardDescription>
        </CardHeader>
        <CardContent style={{ display: "grid", gap: "0.75rem" }}>
          <Input label="Display name" defaultValue="Alex Morgan" />
          <Input label="Email" type="email" defaultValue="alex@example.com" />
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Switch defaultChecked aria-label="Enable notifications" />
            <span style={{ fontSize: "var(--lumen-font-size-sm)" }}>Email notifications</span>
          </div>
          <Checkbox label="Marketing updates" />
        </CardContent>
        <CardFooter style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p style={{ margin: "0.75rem 0 0", color: "var(--lumen-color-text-secondary)" }}>
            Revenue is up 12% compared to last month.
          </p>
        </TabsContent>
        <TabsContent value="analytics">
          <p style={{ margin: "0.75rem 0 0", color: "var(--lumen-color-text-secondary)" }}>
            Detailed analytics will appear here.
          </p>
        </TabsContent>
      </Tabs>

      <Separator />

      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Your trial ends in 3 days.</AlertDescription>
      </Alert>

      <Banner variant="warning">
        <BannerTitle>Scheduled maintenance</BannerTitle>
        <BannerDescription>Services may be unavailable tonight from 11pm–1am.</BannerDescription>
      </Banner>

      <Progress value={68} aria-label="Storage used" />
    </div>
  );
}

const meta: Meta = {
  title: "Foundation/Theme",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Side-by-side preview of core components in light and dark themes. Toggle the global theme toolbar to switch the whole canvas, or compare both palettes at once below.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const LightAndDark: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        padding: "2rem",
        backgroundColor: "var(--lumen-color-muted)",
        minHeight: "100vh",
      }}
    >
      <ThemePanel theme="light" title="Light theme">
        <ComponentSamples />
      </ThemePanel>
      <ThemePanel theme="dark" title="Dark theme">
        <ComponentSamples />
      </ThemePanel>
    </div>
  ),
};

export const SingleThemeCanvas: Story = {
  render: () => <ComponentSamples />,
  parameters: {
    docs: {
      description: {
        story: "Use the Storybook theme toolbar above to switch between light and dark.",
      },
    },
  },
};
