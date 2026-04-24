"use client";

export default function SlideClosing({ active }: { active: boolean; onNext: () => void }) {
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
      <div style={{ fontSize: 12, letterSpacing: 6, color: "var(--muted)", marginBottom: 24 }}>
        ◉ 05 · 最后一句
      </div>

      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 88px)",
          fontWeight: 900,
          letterSpacing: -1,
          lineHeight: 1.1,
          marginBottom: 32,
          background: "linear-gradient(120deg, #5ab9ff, #a78bfa, #ff4d7a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s",
        }}
      >
        别只把 AI 当搜索用
      </h1>

      <p
        style={{
          fontSize: "clamp(18px, 2.5vw, 28px)",
          color: "var(--ink)",
          lineHeight: 1.6,
          maxWidth: 900,
          opacity: active ? 0.9 : 0,
          transform: active ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s 0.2s",
        }}
      >
        把任务交给它 —— 写代码、画画、订票、学习、做游戏。
        <br />
        <span style={{ color: "var(--green)" }}>你负责想要什么，它负责搞定怎么做。</span>
      </p>

      <div
        style={{
          marginTop: 80,
          display: "flex",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: active ? 1 : 0,
          transition: "opacity 1s 0.6s",
        }}
      >
        <Badge label="Claude" sub="claude.ai" />
        <Badge label="Claude Code" sub="claude.com/claude-code" />
        <Badge label="v0 · Vercel" sub="v0.app" />
        <Badge label="ChatGPT" sub="chatgpt.com" />
      </div>

      <div
        style={{
          marginTop: 80,
          fontSize: 14,
          color: "var(--muted)",
          letterSpacing: 4,
          fontFamily: '"SF Mono", monospace',
        }}
      >
        谢谢 · Q&A
      </div>
    </div>
  );
}

function Badge({ label, sub }: { label: string; sub: string }) {
  return (
    <div
      style={{
        padding: "12px 20px",
        border: "1px solid var(--line)",
        borderRadius: 3,
        background: "rgba(10,15,28,0.5)",
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--blue)" }}>{label}</div>
      <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: '"SF Mono", monospace', marginTop: 2 }}>
        {sub}
      </div>
    </div>
  );
}
