import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    // coverage: {
    //   exclude: ["src/**/index.ts"],
    //   include: ["src/**/*.ts", "src/**/*.tsx"],
    //   provider: "v8",
    //   reporter: ["text", "json", "html", "lcov"],
    // },
    // reporters: ["default"],
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --no-open flag will skip the automatic opening of a browser
            storybookScript: "yarn storybook --no-open",
          }),
        ],
        test: {
          name: "storybook",
          // Enable browser mode
          browser: {
            enabled: true,
            headless: true,
            // Make sure to install Playwright
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./.storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
