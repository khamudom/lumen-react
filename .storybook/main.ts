import type { StorybookConfig } from "@storybook/react-vite";
import { withoutVitePlugins } from "@storybook/builder-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(viteConfig) {
    // Root vite.config.ts is for the library build; dts breaks Storybook's static build.
    const plugins = await withoutVitePlugins(viteConfig.plugins, ["vite:dts"]);

    // Used by GitHub Pages so preview assets resolve under /<repo>/.
    // Local `npm run storybook` keeps the default `/` base.
    const base = process.env.STORYBOOK_BASE_PATH || viteConfig.base || "/";

    return mergeConfig(
      { ...viteConfig, plugins },
      {
        base,
        build: {
          // Clear library-mode settings inherited from the root Vite config.
          lib: false,
          rollupOptions: {
            external: [],
          },
        },
      },
    );
  },
};

export default config;
