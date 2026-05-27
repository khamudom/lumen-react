import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#09090b",
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "#09090b";
      return (
        <div
          className={isDark ? "lumen-dark" : undefined}
          style={{
            fontFamily: "var(--lumen-font-family)",
            color: "var(--lumen-color-text)",
            backgroundColor: "var(--lumen-color-background)",
            padding: "2rem",
            minHeight: "100vh",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
