"use client";

import { useEffect, useState } from "react";

export default function SlideCover({ active }: { active: boolean; onNext: () => void }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div style={container}>
      <div style={{ fontSize: 12, letterSpacing: 6, color: "var(--muted)", marginBottom: 24 }}>
        ◉ 2026 · 大学同学 20 年聚会
      </div>

      <h1
        style={{
          fontSize: "clamp(48px, 9vw, 128px)",
          fontWeight: 900,
          letterSpacing: -2,
          lineHeight: 1,
          margin: 0,
          background:
            "linear-gradient(120deg, #5ab9ff 0%, #a78bfa 40%, #ff4d7a 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: `hue-rotate(${Math.sin(tick / 30) * 15}deg)`,
        }}
      >
        AI AGENT
      </h1>
      <h2
        style={{
          fontSize: "clamp(24px, 4vw, 56px)",
          fontWeight: 300,
          letterSpacing: 8,
          marginTop: 8,
          color: "var(--ink)",
          opacity: 0.9,
        }}
      >
        聊聊这届 AI 能自己干什么
      </h2>

      <div
        style={{
          marginTop: 80,
          display: "flex",
          gap: 40,
          fontSize: 13,
          letterSpacing: 2,
          color: "var(--muted)",
          fontFamily: '"SF Mono", monospace',
        }}
      >
        <span>→ / 空格 · 下一页</span>
        <span>← · 上一页</span>
        <span>1–9 · 跳页</span>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 8%",
  textAlign: "center",
};
