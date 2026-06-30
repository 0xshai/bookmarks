import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://80h.pages.dev",
  integrations: [
    starlight({
      title: "闪光小破站",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
          },
        },
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "https://cloud.umami.is/script.js",
            "data-website-id": "f4a49d2e-86fc-4591-909e-27b5dd86d5f4",
          },
        },
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "https://static.cloudflareinsights.com/beacon.min.js",
            "data-cf-beacon": '{"token": "4605ca57afc94ff388ea827eb788b31a"}',
          },
        },
      ],
      defaultLocale: "root",
      locales: { root: { label: "中文", lang: "zh-CN" } },
      sidebar: [
        { label: "神奇工具", slug: "bookmarks" },
        { label: "命令速查", slug: "commands/cheatsheet" },
        {
          label: "工具秘籍",
          items: [
            { label: "mpv 播放器", slug: "tools/mpv" },
            { label: "Lazygit Git可视化工具", slug: "tools/lazygit" },
            { label: "LosslessCut 无损视频剪辑", slug: "tools/losslesscut" },
            { label: "Voicebox 本地开源语音工作室", slug: "tools/voicebox" },
            { label: "yt-dlp 视频下载工具", slug: "tools/yt-dlp" },
            { label: "ShareX 截图录屏工具", slug: "tools/sharex-guide" },
            { label: "MarkItDown 微软出品", slug: "tools/markitdown" },
            { label: "WinUtil Windows优化工具", slug: "tools/winutil" },
            { label: "ExifTool 图片视频元数据", slug: "tools/exiftool-guide" },
            { label: "MAT2 元数据清除工具", slug: "tools/mat2" },
            { label: "n8n 工作流自动化中心", slug: "tools/n8n-self-host" },
          ],
        },
        {
          label: "折腾记录",
          items: [
            {
              label: "只改一个文件，README自动同步",
              slug: "tinkering/github-actions-readme",
            },
            {
              label: "自选安装路径",
              slug: "tinkering/custom-installation-path",
            },
            {
              label: "WSL2跑Docker，顺手装了Immich",
              slug: "tinkering/wsl2-docker-immich",
            },
            {
              label: "Syncthing + Tailscale + Joplin",
              slug: "tinkering/syncthing-tailscale-joplin",
            },
            {
              label: "把网站提交给搜索引擎",
              slug: "tinkering/search-engine-submission",
            },
          ],
        },
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
            {
              label: "小企鹅的二十年",
              slug: "people/fcitx-story",
            },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
