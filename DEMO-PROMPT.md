# 现场演示提示词 · AI Agent 靶场

---

## 版本 A（魔法版 · 30 秒念完，视觉冲击最大）

> 适合现场朗读，让孩子听到"一句话变一个游戏"的效果。
> 风险：模型可能漏细节、选错依赖版本、跑偏风格。**建议搭配版本 B 做兜底。**

```
在当前目录用 Next.js 15 + TypeScript + react-three-fiber 做一个
瓦罗兰风格的浏览器第一人称射击 demo，主题是 "AI Agent 靶场"。

场景：低多边形科幻靶场，深蓝地面 + 掩体 + 霓虹灯光。
敌人：7 个红色胶囊人，头顶蓝光环，代表 AI agent，被击中爆成碎块。
枪械：步枪跟随相机，开火有枪口火焰、后坐力、黄色子弹轨迹。
HUD：中心准星、KILLS/SCORE/ACCURACY 仪表、DOUBLE KILL 连杀弹字。
后处理：Bloom 泛光 + 色差 + Vignette。
左下角 "AGENT THOUGHTS · LIVE" 面板，每 1.4 秒滚动一条伪造的 agent 思考。
击杀全部目标触发 VICTORY 动画。

一次性装依赖、启动 dev server 在端口 3456，遇到错误自己修。
不要问我额外问题。
```

---

## 版本 B（稳妥版 · 细节全给，几乎不可能跑偏）

> 现场粘贴到 Claude Code，~5 分钟能跑起来。
> 用于兜底 / 想让模型少试错的场景。

```
在当前目录用 Next.js 15 (App Router) + TypeScript 搭一个浏览器 FPS demo。

依赖（必须这些版本）：
- next@^15, react@^19, react-dom@^19
- three@^0.170
- @react-three/fiber@^9
- @react-three/drei@^10
- @react-three/postprocessing@^3
- zustand@^5

主题："AI Agent 靶场"，瓦罗兰低多边形配色：
- 背景 #0a0f1c，地面 #141b2c，掩体 #2a3452
- 高光蓝 #5ab9ff，霓虹粉 #ff4d7a，金黄 #ffd66b
- 启用 ACESFilmic tone mapping + 雾效 fog 20→90

组件结构（/app/components 下）：
- Game.tsx（Canvas 容器 + HUD 叠加）
- Scene.tsx（灯光、地面、网格、墙、掩体、7 个目标、PointerLockControls）
- Player.tsx（WASD 移动 + 鼠标左键 raycast 开枪 + 轨迹生成）
- Target.tsx（胶囊人 + 光环 + 击中后 14 片重力碎块）
- Rifle.tsx（步枪几何体跟随相机 + 枪口火焰 + 后坐力）
- Tracers.tsx（子弹轨迹圆柱 120ms 渐隐）
- Effects.tsx（Bloom + ChromaticAberration + Vignette）
- HUD.tsx（准星 + 仪表盘 + 连杀弹字 + AGENT THOUGHTS 面板 + 开始/胜利界面）

状态（/lib/store.ts zustand）：
phase ("idle" | "playing" | "victory")、score、kills、shots、
targets[]、tracers[]、killStreakCount、streakLabel、
连杀判定窗口 2000ms：2 连 "DOUBLE KILL"，3 连 "TRIPLE KILL"，≥4 连 "ACE"。

AGENT THOUGHTS 面板（左下角）：
准备 10 条预设文案，每 1.4 秒追加一条，最多显示最近 6 条，最后一条高亮绿色。
例如 "Agent-03 > 检测到玩家 → 寻找掩体"。

启动 dev server 在端口 3456。遇到报错自己修到能打开。
```

---

## 现场操作建议（防翻车）

**演示前 10 分钟**（趁别人讲话时）：
1. 打开 Claude Code，`cd` 到演示目录
2. 运行一次 `npm cache ls next` 让 npm 缓存热起来
3. 确认网络通畅（国内用 `npm config set registry https://registry.npmmirror.com`）

**演示当场**：
1. 清空窗口、开大字体（iTerm 调到 18pt+ 全屏）
2. 念版本 A 粘贴进 Claude Code → 回车
3. **关键戏剧点**：当 Claude 开始调用工具时，暂停念白："看，它不是在回答我——它在**自己写代码、自己装依赖、自己启动服务器**。这就是 agent。"
4. 等它跑完，打开浏览器 → 全场"哇"
5. 再补一句给大人："刚刚一分钟，它写了 8 个文件、调了 20 次工具。"

**兜底方案**：
- 演示目录下预留一个已经跑通的 `game/`（就是我们刚做的这个）
- 万一现场 Claude 卡住，优雅地说"我们看看我昨晚让它做的版本"→ 直接打开本地已跑的 dev server
- **永远不要让白屏持续超过 30 秒**

**可选加料**：
- 用 VSCode 屏幕录制背景音乐（低音量），Claude Code 敲键盘声本身就很有节奏
- 让一个小朋友上来按回车发送 prompt，参与感拉满
