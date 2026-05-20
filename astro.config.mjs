import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://expostandspanama.com",
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  compressHTML: true,
  scopedStyleStrategy: "where",
});
