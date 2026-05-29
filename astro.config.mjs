import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://expostandspanama.com",
  output: "static",

  build: {
    inlineStylesheets: "auto",
  },

  compressHTML: true,
  scopedStyleStrategy: "where",
  adapter: cloudflare()
});