---
title: yt-dlp 使用指南
description: 开源视频下载工具 yt-dlp 的安装与常用用法
---

yt-dlp 是目前最活跃的开源视频下载工具，基于停止维护的 youtube-dl 分支开发，修复了大量 bug，下载速度更快，支持网站更多。

## 安装

**Windows（Scoop）**

```bash
scoop install yt-dlp
```

同时建议安装 FFmpeg，用于合并音视频流：

```bash
scoop install ffmpeg
```

**其他方式**

```bash
# pip
pip install yt-dlp

# 直接下载可执行文件
# https://github.com/yt-dlp/yt-dlp/releases
```

## 基本用法

```bash
# 下载视频（默认最高画质）
yt-dlp https://www.youtube.com/watch?v=xxxxx

# 查看可用格式列表
yt-dlp -F URL

# 指定格式下载
yt-dlp -f 137+140 URL
```

## 常用参数

### 输出路径

默认下载到当前目录，可用 `-o` 指定路径和文件名模板：

```bash
yt-dlp -o "D:\Downloads\%(title)s.%(ext)s" URL
```

常用模板变量：`%(title)s` 标题、`%(ext)s` 扩展名、`%(uploader)s` 上传者、`%(upload_date)s` 上传日期。

### 画质选择

```bash
# 最高画质（默认）
yt-dlp -f "bestvideo+bestaudio" URL

# 指定最高 1080P
yt-dlp -f "bestvideo[height<=1080]+bestaudio" URL

# 仅下载音频
yt-dlp -f bestaudio URL
```

### 提取音频

```bash
# 转换为 mp3
yt-dlp -x --audio-format mp3 URL

# 转换为 m4a
yt-dlp -x --audio-format m4a URL
```

### 字幕

```bash
# 下载字幕（不嵌入）
yt-dlp --write-sub --sub-lang zh-Hans URL

# 下载自动生成字幕
yt-dlp --write-auto-sub --sub-lang zh-Hans URL

# 将字幕嵌入视频
yt-dlp --embed-subs URL
```

### 播放列表

```bash
# 下载整个播放列表
yt-dlp https://www.youtube.com/playlist?list=xxxxx

# 下载第 2 到第 5 个视频
yt-dlp --playlist-items 2-5 URL

# 下载最新 10 个
yt-dlp --playlist-end 10 URL
```

## Windows 注意事项

在 PowerShell 中，URL 里如果含有 `&` 符号（B站、抖音链接常见），必须加引号，否则 `&` 后面的内容会被当成新命令执行：

```powershell
# 错误，& 后面的参数会报错
yt-dlp https://www.bilibili.com/video/BV1rrE162EB4?foo=1&bar=2

# 正确
yt-dlp "https://www.bilibili.com/video/BV1rrE162EB4?foo=1&bar=2"
```

其实 `?` 后面的参数大多数情况下不需要，直接用干净的链接即可：

```powershell
yt-dlp "https://www.bilibili.com/video/BV1rrE162EB4"
```

## B站下载

B站未登录只能下载低画质，且可能遭遇 412 反爬错误，需要传入 cookies：

```bash
# 从浏览器读取登录状态（推荐，需先完全关闭浏览器）
yt-dlp --cookies-from-browser chrome URL
yt-dlp --cookies-from-browser edge URL
yt-dlp --cookies-from-browser brave URL

# 或导出 cookies.txt 文件后使用
yt-dlp --cookies cookies.txt URL
```

cookies.txt 可用浏览器扩展 [Get cookies.txt LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc) 导出。

**常见错误**

`HTTP Error 412`：B站反爬限制，带上 cookies 即可解决。

`Could not copy Chrome cookie database`：浏览器未完全关闭导致数据库被锁，退出浏览器（包括托盘）后重试，或改用导出 cookies.txt 的方式。

## 抖音下载

抖音网页版视频链接格式为 `/video/ID`，精选、推荐等页面的链接无法直接下载，需要转换：

```powershell
# 正确格式
yt-dlp "https://www.douyin.com/video/7650796556723031342"

# 需要登录的内容同样加上 cookies
yt-dlp --cookies-from-browser brave "https://www.douyin.com/video/7650796556723031342"
```

## 配置文件

频繁使用相同参数时，可写入配置文件，避免每次手动输入。

Windows 路径：`%APPDATA%\yt-dlp\config.txt`

```text
# 默认输出路径
-o D:\Downloads\%(title)s.%(ext)s

# 默认最高画质
-f bestvideo+bestaudio

# 嵌入字幕
--embed-subs
--write-auto-sub
--sub-lang zh-Hans,en
```

## 更新

```bash
# Scoop 安装的直接用 Scoop 更新
scoop update yt-dlp

# pip 安装的
yt-dlp -U
```

## 免责声明

请遵守当地法律法规及各平台服务条款，仅下载有权限获取的内容。
