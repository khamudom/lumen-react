/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import type { Preview } from "@storybook/react";
import { applyTheme } from "../src/theme/applyTheme";
import type { ResolvedTheme } from "../src/theme/types";
import "../src/styles/tokens.css";
import "../src/styles/globals.css";

function ThemeDecorator(Story: () => React.ReactNode, context: { globals: { theme?: ResolvedTheme } }) {
  const theme = context.globals.theme ?? "light";
  const isDark = theme === "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div
      className={isDark ? "lumen-dark" : undefined}
      data-lumen-theme={theme}
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
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
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
  },
  decorators: [ThemeDecorator],
  tags: ["autodocs"],
};

export default preview;
