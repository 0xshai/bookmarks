import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://80h.pages.dev",
  integrations: [
    starlight({
      title: "闪光小破站",
      defaultLocale: "root",
      locales: { root: { label: "中文", lang: "zh-CN" } },
      sidebar: [
        { label: "神奇工具", slug: "bookmarks" },
        { label: "命令速查", slug: "commands/cheatsheet" },
        {
          label: "工具秘籍",
          items: [
            { label: "mpv 播放器", slug: "tools/mpv" },
            { label: "Lazygit 使用指南", slug: "tools/lazygit" },
            { label: "LosslessCut 无损视频剪辑", slug: "tools/losslesscut" },
          ],
        },
        {
          label: "折腾记录",
          items: [
            {
              label: "只改一个文件，README自动同步",
              slug: "tinkering/github-actions-readme",
            },
          ],
        },
        // ✅ 新增：牛人故事
        {
          label: "牛人故事",
          items: [
            { label: "Brendan Eich：JS 之父", slug: "people/brendan-eich" },
            {
              label: "Dennis Ritchie：C 语言之父",
              slug: "people/dennis-ritchie",
            },
            {
              label: "Fabrice Bellard：重写互联网底层",
              slug: "people/fabrice-bellard",
            },
            {
              label: "John Carmack：3D游戏时代的开创者",
              slug: "people/john-carmack",
            },
            {
              label: "Moxie Marlinspike：给世界造了把锁",
              slug: "people/moxie-marlinspike",
            },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
