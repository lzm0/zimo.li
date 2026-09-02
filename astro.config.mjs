import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://zimo.li",
  redirects: { "/blogs": "/posts" },
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", zh: "zh" } },
    }),
  ],
  markdown: {
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },
  vite: { plugins: [tailwindcss()] },
});
