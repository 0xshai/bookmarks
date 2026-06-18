import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://80h.pages.dev", // 改成你的 CF Pages 地址
  integrations: [
    starlight({
      title: "闪光小破站",
      defaultLocale: "root",
      locales: { root: { label: "中文", lang: "zh-CN" } },
      sidebar: [
        { label: "神奇工具", slug: "bookmarks" },
        { label: "命令速查", slug: "commands/cheatsheet" },
        {
          label: "工具说明",
          items: [
            { label: "mpv 播放器", slug: "tools/mpv" },
            { label: "Lazygit 使用指南", slug: "tools/lazygit" },
            { label: "LosslessCut 无损视频剪辑", slug: "tools/losslesscut" },
          ],
        },
        {
          label: "折腾记录", // 新增
          items: [
            {
              label: "只改一个文件，README自动同步",
              slug: "tinkering/github-actions-readme",
            },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
