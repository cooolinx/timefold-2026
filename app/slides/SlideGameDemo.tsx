"use client";

import Link from "next/link";

export default function SlideGameDemo({ active }: { active: boolean; onNext: () => void }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8%",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: 6, color: "var(--pink)", marginBottom: 12 }}>
        ◉ 02 · 现场演示
      </div>
      <h1
        style={{
          fontSize: "clamp(40px, 7vw, 88px)",
          fontWeight: 900,
          letterSpacing: -1,
          marginBottom: 12,
          background: "linear-gradient(90deg, #5ab9ff, #ff4d7a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        AI AGENT 靶场
      </h1>
      <p style={{ fontSize: 18, color: "var(--muted)", letterSpacing: 2, marginBottom: 48 }}>
        一个浏览器里的 FPS · 敌人都是 AI 操控的 agent
      </p>

      <Link
        href="/game"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          padding: "20px 56px",
          background: "linear-gradient(90deg, #5ab9ff, #ff4d7a)",
          color: "#05070d",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 4,
          textDecoration: "none",
          borderRadius: 3,
          boxShadow: "0 0 40px rgba(90,185,255,0.5)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.boxShadow = "0 0 60px rgba(255,77,122,0.7)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 40px rgba(90,185,255,0.5)";
        }}
      >
        ▶ 进入靶场
      </Link>

      <div
        style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          width: "min(100%, 900px)",
          fontFamily: '"SF Mono", monospace',
        }}
      >
        <Feature label="WASD" sub="移动" />
        <Feature label="鼠标" sub="瞄准" />
        <Feature label="左键" sub="开火" />
        <Feature label="ESC" sub="退出" />
      </div>

      <div
        style={{
          marginTop: 64,
          maxWidth: 720,
          fontSize: 14,
          color: "var(--muted)",
          lineHeight: 1.7,
        }}
      >
        注意左下角的{" "}
        <span style={{ color: "var(--green)", fontFamily: '"SF Mono", monospace' }}>
          AGENT THOUGHTS · LIVE
        </span>{" "}
        面板 —— 那是每个 AI 敌人**正在思考的事情**。
        <br />
        它们不是脚本，是在自己做决策。
      </div>
    </div>
  );
}

function Feature({ label, sub }: { label: string; sub: string }) {
  return (
    <div
      style={{
        padding: "16px 8px",
        border: "1px solid var(--line)",
        borderRadius: 3,
        background: "rgba(10,15,28,0.4)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--blue)", letterSpacing: 2 }}>{label}</div>
      <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: 3, marginTop: 4 }}>{sub}</div>
    </div>
  );
}
