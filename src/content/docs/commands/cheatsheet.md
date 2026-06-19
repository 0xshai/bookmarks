---
title: "常用命令速查"
description: "个人常用命令汇总：网站维护、Git、Scoop、多媒体处理等。"
---

## 网站维护

### 新电脑克隆博客仓库

首先配置 SSH key：

```bash
# 生成密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 查看公钥，复制后添加到 GitHub
cat ~/.ssh/id_ed25519.pub
```

公钥添加到 GitHub → Settings → SSH and GPG keys → New SSH key。

然后克隆仓库：

```bash
git clone git@github.com:0xshai/bookmarks.git
cd bookmarks
pnpm dev
```

如果 pnpm 版本切换报错，先执行：

```bash
pnpm config set pmOnFail ignore
```

再重新运行 `pnpm dev`。
### 推送更新到 GitHub
```powershell
git add .
git commit -m "描述改动内容"
git push origin main
```

### 本地预览

```powershell
pnpm dev
```

### 强制清除缓存重启

```powershell
Remove-Item -Recurse -Force .astro, node_modules/.cache -ErrorAction SilentlyContinue
pnpm dev
```

### 重新生成 lockfile（依赖出问题时）

```powershell
Remove-Item pnpm-lock.yaml
pnpm install
```

---

## 网站内容管理

### 加一篇工具说明文章

1. 新建 `src/content/docs/tools/文件名.md`，写入 frontmatter：

```markdown
---
title: "文章标题"
description: "一句话描述"
---
```

2. `astro.config.mjs` 的 sidebar 对应分组里加一行：

```js
{ label: "显示名称", slug: "tools/文件名" }
```

### 加书签工具

编辑 `src/data/bookmarks.ts`，在对应分类的 `items` 里加：

```ts
{ name: '工具名', url: 'https://...', desc: '一句话描述', opensource: true }
```

### 加新书签分类

1. `bookmarks.ts` 新增对象：

```ts
{ category: '新分类', icon: '🔧', items: [...] }
```

2. `bookmarks.mdx` 加两行：

```mdx
## 新分类
<BookmarkGrid category="新分类" />
```

3. `BookmarkGrid.astro` 的 `iconMap` 加对应图标映射。

### 加左侧目录分组

`astro.config.mjs` 的 sidebar 加：

```js
{
  label: "分组名称",
  items: [
    { label: "页面名", slug: "路径/文件名" },
  ],
},
```

---

## Git 常用命令

### 两种上传方式

**SSH 方式**（推荐，配置一次永不用输密码）

```powershell
# 前提：已在 GitHub 添加 SSH 公钥
# 克隆
git clone git@github.com:0xshai/仓库名.git

# 切换为 SSH
git remote set-url origin git@github.com:0xshai/仓库名.git
```

**HTTPS 方式**（用 Personal Access Token，不支持账号密码）

```powershell
# 克隆
git clone https://github.com/0xshai/仓库名.git

# 切换为 HTTPS
git remote set-url origin https://github.com/0xshai/仓库名.git

# 第一次 push 会提示输入用户名和 Token（输入后系统会记住）
# Token 在 GitHub → Settings → Developer settings → Personal access tokens 生成
```

### 查看 / 切换远程地址

```powershell
# 查看当前用的哪种
git remote -v

# 切换为 SSH
git remote set-url origin git@github.com:0xshai/仓库名.git

# 切换为 HTTPS
git remote set-url origin https://github.com/0xshai/仓库名.git
```

### 其他常用

```powershell
# 查看状态
git status

# 查看提交历史
git log --oneline -10

# 拉取最新代码
git pull origin main

# 撤销最后一次提交（保留文件改动）
git reset --soft HEAD~1

# 丢弃所有本地改动
git reset --hard HEAD

# 查看某文件改动
git diff 文件路径
```

---

## Scoop 常用命令

```powershell
# 安装软件
scoop install 软件名

# 卸载软件
scoop uninstall 软件名

# 更新单个软件
scoop update 软件名

# 更新所有软件
scoop update *

# 更新 Scoop 本身
scoop update

# 查看已安装列表
scoop list

# 搜索软件
scoop search 关键词

# 清理旧版本
scoop cleanup *

# 查看软件信息
scoop info 软件名

# 添加 bucket
scoop bucket add extras
scoop bucket add versions
```

---

## 多媒体处理

### ImageMagick 批量转 AVIF

```powershell
magick mogrify -format avif -quality 80 *.jpg
```

### HandBrake CLI（AV1 编码）

```powershell
HandBrakeCLI -i 输入.mp4 -o 输出.mp4 --encoder svt_av1 --quality 30 --encoder-preset 6
```

### FFmpeg 常用

```powershell
# 查看文件信息
ffmpeg -i 文件名

# 转换格式
ffmpeg -i 输入.mp4 输出.mkv

# 无损剪切（不重新编码）
ffmpeg -i 输入.mp4 -ss 00:01:00 -to 00:02:00 -c copy 输出.mp4

# 提取音频
ffmpeg -i 输入.mp4 -vn -acodec copy 输出.aac
```

---

## Windows PowerShell 常用

### 代理 / 网络切换

```powershell
# 查看当前代理设置
[System.Net.WebRequest]::DefaultWebProxy

# 设置代理（当前会话有效）
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"

# 取消代理（切回直连）
Remove-Item Env:HTTP_PROXY -ErrorAction SilentlyContinue
Remove-Item Env:HTTPS_PROXY -ErrorAction SilentlyContinue

# 给 Git 单独设置代理
git config --global http.proxy http://127.0.0.1:7890

# 取消 Git 代理
git config --global --unset http.proxy
git config --global --unset https.proxy

# 给 Scoop / PowerShell 设置全局代理（写入 profile，永久生效）
# 编辑 $PROFILE，加入：
# $env:HTTP_PROXY = "http://127.0.0.1:7890"
# $env:HTTPS_PROXY = "http://127.0.0.1:7890"
```

> 端口号按你实际用的代理软件填写，常见：Clash 7890，V2rayN 10809。

### 其他常用

```powershell
# 查看文件内容
Get-Content 文件路径

# 查看文件指定行（如第 10-20 行）
Get-Content 文件路径 | Select-Object -Index (9..19)

# 搜索文件内容
Select-String -Path 文件路径 -Pattern "关键词"

# 删除文件夹
Remove-Item -Recurse -Force 文件夹路径

# 新建文件夹
New-Item -ItemType Directory -Path 文件夹路径

# 复制文件
Copy-Item 源路径 目标路径

# 查看端口占用
netstat -ano | findstr :4321
```

---

## Git 提交信息规范

```
feat: 新功能
fix: 修复问题
docs: 文档改动
style: 样式调整
refactor: 重构
chore: 杂项（依赖更新等）
```

示例：`git commit -m "feat: 新增工具说明分类"`

---

## Markdown 语法速查

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```

### 文字样式

```markdown
**粗体**
*斜体*
~~删除线~~
**_粗体加斜体_**
`行内代码`
```

### 列表

```markdown
- 无序列表
- 第二项
  - 嵌套项（两个空格缩进）

1. 有序列表
2. 第二项
   1. 嵌套有序

- [x] 任务列表（已完成）
- [ ] 任务列表（未完成）
```

### 链接与图片

```markdown
[链接文字](https://example.com)
[链接文字](https://example.com "鼠标悬停提示")

![图片描述](图片URL)
![图片描述](图片URL "提示文字")

<!-- 引用式链接，适合正文多次用到同一链接 -->
[链接文字][id]
[id]: https://example.com
```

### 引用

```markdown
> 这是一段引用
> 可以多行

> 第一层引用
>> 嵌套引用
```

### 代码块

````markdown
`行内代码`

```python
# 指定语言，有语法高亮
print("hello")
```

```
不指定语言
```
````

### 表格

```markdown
| 列1     | 列2     | 列3     |
| ------- | :-----: | ------: |
| 默认左对齐 | 居中  | 右对齐  |
| 内容    | 内容    | 内容    |
```

> `:---` 左对齐，`:---:` 居中，`---:` 右对齐

### 分隔线

```markdown
---
```

### 脚注

```markdown
这里有个注释[^1]。

[^1]: 这是脚注内容，会显示在文章底部。
```

### 转义字符

```markdown
\*不想变成斜体\*
\# 不想变成标题
```

常用需要转义的字符：`\ * _ # [ ] ( ) > + - . !`

### HTML 混用

```markdown
<!-- 注释，不会渲染 -->

<br> 强制换行

<details>
<summary>点击展开</summary>

折叠内容写这里，上下各留一个空行。

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd>  <!-- 键盘按键样式 -->
```

> 注意：部分平台（如微信）不支持 HTML 混用，Obsidian / GitHub / Hugo 均支持。

### Starlight文档
<a href="https://starlight.astro.build/zh-cn/" target="_blank" rel="noopener noreferrer" onclick="window.open(this.href); return false;">Starlight 文档</a>
