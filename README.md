# AI Agent · 同学聚会分享

一个用 Next.js + react-three-fiber 做的可互动分享幻灯片，含一个可玩的浏览器 FPS demo（`/game`）作为"什么是 AI agent"的现场演示。

## 页面

- `/` — 6 页互动 slider（方向键 / 空格翻页，数字键跳页）
- `/game` — "AI Agent 靶场" 第一人称射击 demo（瓦罗兰风格 · 低多边形 · Bloom 后处理）

## 本地运行

```bash
npm install
npm run dev
# → http://localhost:3000
```

快捷键：

- `→` / `空格` · 下一页
- `←` · 上一页
- `1`–`9` · 直接跳到某页

## 部署到 Vercel

最快方式：

1. 把这个目录推到 GitHub 仓库
2. 打开 [vercel.com/new](https://vercel.com/new)，导入这个 repo
3. 直接 Deploy —— 不需要任何额外配置（Next.js 15 + App Router 开箱即用）

命令行方式（需要 `npm i -g vercel`）：

```bash
vercel           # 预览部署
vercel --prod    # 正式部署
```

## 演示当天的用法

1. 打开投影 + 浏览器全屏进入 `/`
2. 依次讲解 slide 1→2
3. Slide 3 点"进入靶场"让孩子上来玩 2–3 分钟
4. 回到 Slide 4，现场念提示词粘贴到 Claude Code 演示"一句话造游戏"
5. Slide 5/6 结尾 Q&A

提示词原文见 [DEMO-PROMPT.md](./DEMO-PROMPT.md)。

## 技术栈

- Next.js 15 (App Router) + React 19 + TypeScript
- react-three-fiber v9 + drei v10 + postprocessing v3
- zustand（游戏状态）
- 0 后端，纯静态，边缘部署友好

## 目录结构

```
app/
  page.tsx              # slider 主页
  layout.tsx
  globals.css
  slides/               # 6 个 slide 组件
  game/
    page.tsx            # /game 路由
    BackLink.tsx
    components/         # FPS 游戏的 R3F 组件
lib/
  store.ts              # 游戏状态 (zustand)
DEMO-PROMPT.md          # 给 Claude Code 的提示词
```
