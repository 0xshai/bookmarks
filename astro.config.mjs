import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "闪光小破站",
      defaultLocale: "root",
      locales: { root: { label: "中文", lang: "zh-CN" } },
      sidebar: [{ label: "书签", slug: "bookmarks" }],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
