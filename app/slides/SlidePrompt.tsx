"use client";

import { useEffect, useState } from "react";

const PROMPT = `在当前目录用 Next.js 15 + TypeScript + react-three-fiber
做一个瓦罗兰风格的浏览器第一人称射击 demo，主题是 "AI Agent 靶场"。

场景：低多边形科幻靶场，深蓝地面 + 掩体 + 霓虹灯光。
敌人：7 个红色胶囊人，头顶蓝光环，代表 AI agent，
      被击中爆成碎块。
枪械：步枪跟随相机，开火有枪口火焰、后坐力、
      黄色子弹轨迹。
HUD: 中心准星、KILLS/SCORE/ACCURACY 仪表、
      DOUBLE KILL 连杀弹字。
后处理：Bloom 泛光 + 色差 + Vignette。
左下角 "AGENT THOUGHTS · LIVE" 面板，每 1.4 秒
滚动一条伪造的 agent 思考。
击杀全部目标触发 VICTORY 动画。

一次性装依赖、启动 dev server，遇到错误自己修。`;

export default function SlidePrompt({ active }: { active: boolean; onNext: () => void }) {
  const [typed, setTyped] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!active) {
      setTyped("");
      return;
    }
    let i = 0;
    const iv = setInterval(() => {
      i += 8;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [active]);

  const copy = async () => {
    await navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 6%",
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: 6, color: "var(--gold)", marginBottom: 12 }}>
        ◉ 03 · 这个游戏是怎么来的？
      </div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, marginBottom: 8, textAlign: "center" }}>
        我只说了<span style={{ color: "var(--gold)" }}>一段话</span>
      </h1>
      <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 32, letterSpacing: 2 }}>
        剩下的全是 Claude Code 自己做的
      </p>

      <div
        style={{
          width: "min(100%, 920px)",
          border: "1px solid var(--line)",
          borderRadius: 8,
          background: "rgba(10,15,28,0.85)",
          boxShadow: "0 0 40px rgba(90,185,255,0.15)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid var(--line)",
            background: "rgba(90,185,255,0.06)",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <Dot color="#ff5f57" />
            <Dot color="#febc2e" />
            <Dot color="#28c840" />
          </div>
          <span
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: "var(--muted)",
              fontFamily: '"SF Mono", monospace',
            }}
          >
            prompt.txt
          </span>
          <button
            onClick={copy}
            style={{
              fontSize: 11,
              padding: "4px 10px",
              background: copied ? "var(--green)" : "transparent",
              color: copied ? "#05070d" : "var(--blue)",
              border: "1px solid var(--blue)",
              borderRadius: 3,
              cursor: "pointer",
              fontFamily: '"SF Mono", monospace',
              letterSpacing: 2,
            }}
          >
            {copied ? "COPIED ✓" : "COPY"}
          </button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: 20,
            fontSize: 13,
            lineHeight: 1.75,
            fontFamily: '"SF Mono", "Consolas", monospace',
            color: "var(--ink)",
            whiteSpace: "pre-wrap",
            minHeight: 360,
          }}
        >
          {typed}
          {active && typed.length < PROMPT.length && (
            <span style={{ color: "var(--blue)", animation: "blink 1s infinite" }}>▎</span>
          )}
        </pre>
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: 40,
          fontSize: 13,
          color: "var(--muted)",
          fontFamily: '"SF Mono", monospace',
          letterSpacing: 2,
        }}
      >
        <Metric label="文件" value="8" accent="var(--blue)" />
        <Metric label="代码行" value="~900" accent="var(--pink)" />
        <Metric label="工具调用" value="~30" accent="var(--gold)" />
        <Metric label="耗时" value="5 分钟" accent="var(--green)" />
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <div style={{ width: 12, height: 12, borderRadius: 6, background: color }} />;
}

function Metric({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent, textShadow: `0 0 10px ${accent}` }}>{value}</div>
      <div style={{ fontSize: 10, opacity: 0.6 }}>{label}</div>
    </div>
  );
}
