"use client";

export default function SlideAgentVsChat({ active }: { active: boolean; onNext: () => void }) {
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
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: 6, color: "var(--blue)", marginBottom: 12 }}>
        ◉ 01 · 基本概念
      </div>
      <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: -1, marginBottom: 56 }}>
        AI Agent <span style={{ opacity: 0.5 }}>≠</span>{" "}
        <span style={{ color: "var(--muted)", fontWeight: 400 }}>聊天机器人</span>
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, width: "min(100%, 1100px)" }}>
        <Card
          title="聊天机器人"
          subtitle="ChatBot"
          tone="muted"
          items={[
            "你问一句，它答一句",
            "只会用嘴说",
            "每次对话从零开始",
            '像"有问必答的同学"',
          ]}
          active={active}
        />
        <Card
          title="AI AGENT"
          subtitle="会自己干活的 AI"
          tone="hot"
          items={[
            "你说目标，它自己规划步骤",
            "会用工具：写代码、查资料、开浏览器、付钱",
            "失败会自己重试、自己查错",
            '像"替你上班的实习生"',
          ]}
          active={active}
        />
      </div>

      <div
        style={{
          marginTop: 40,
          padding: "14px 28px",
          border: "1px solid var(--line)",
          borderRadius: 4,
          fontSize: 15,
          color: "var(--green)",
          fontFamily: '"SF Mono", monospace',
          background: "rgba(163,247,191,0.05)",
        }}
      >
        一句话：<span style={{ color: "var(--ink)" }}>从"问一下"变成"交给它"</span>
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  tone,
  items,
  active,
}: {
  title: string;
  subtitle: string;
  tone: "muted" | "hot";
  items: string[];
  active: boolean;
}) {
  const accent = tone === "hot" ? "var(--pink)" : "var(--muted)";
  return (
    <div
      style={{
        padding: 28,
        borderRadius: 8,
        border: `1px solid ${tone === "hot" ? "var(--line)" : "rgba(255,255,255,0.08)"}`,
        background:
          tone === "hot"
            ? "linear-gradient(135deg, rgba(255,77,122,0.08), rgba(90,185,255,0.05))"
            : "rgba(255,255,255,0.02)",
        boxShadow: tone === "hot" ? "0 0 40px rgba(255,77,122,0.15)" : "none",
        transition: "transform 0.6s ease",
        transform: active ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 3, color: accent, opacity: 0.8 }}>{subtitle}</div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: tone === "hot" ? 2 : 0,
          color: tone === "hot" ? "var(--ink)" : "var(--muted)",
          marginTop: 4,
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              fontSize: 15,
              color: tone === "hot" ? "var(--ink)" : "var(--muted)",
              paddingLeft: 18,
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", left: 0, color: accent }}>▸</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
