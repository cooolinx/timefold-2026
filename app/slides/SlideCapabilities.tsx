"use client";

const CAPS = [
  {
    icon: "🎨",
    title: "生成图像和视频",
    desc: '"给我画一只在火星开赛车的柯基" → 几秒出图',
    accent: "var(--pink)",
  },
  {
    icon: "💻",
    title: "自己写代码",
    desc: '"做一个 FPS 游戏" → 刚才那个',
    accent: "var(--blue)",
  },
  {
    icon: "🌐",
    title: "自己开浏览器做事",
    desc: "订机票、填表格、比价格 —— 鼠标会自己动",
    accent: "var(--gold)",
  },
  {
    icon: "📚",
    title: "做家庭作业 / 辅导",
    desc: "讲题、出卷子、批改，全科都会",
    accent: "var(--green)",
  },
  {
    icon: "🎮",
    title: "做一个专属游戏",
    desc: "你想玩什么，它就能给你做一个",
    accent: "#a78bfa",
  },
  {
    icon: "🗣️",
    title: "当你的英语对练",
    desc: "随时陪练口语，不烦不累不打分焦虑",
    accent: "#f59e0b",
  },
];

export default function SlideCapabilities({ active }: { active: boolean; onNext: () => void }) {
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
      <div style={{ fontSize: 12, letterSpacing: 6, color: "var(--green)", marginBottom: 12 }}>
        ◉ 04 · 它还能做什么？
      </div>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, marginBottom: 40, textAlign: "center" }}>
        每个小朋友都可以试试这些
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          width: "min(100%, 1200px)",
        }}
      >
        {CAPS.map((c, i) => (
          <div
            key={i}
            style={{
              padding: 24,
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              background: "rgba(255,255,255,0.02)",
              transition: "all 0.4s ease",
              transitionDelay: `${i * 60}ms`,
              transform: active ? "translateY(0)" : "translateY(20px)",
              opacity: active ? 1 : 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = c.accent;
              e.currentTarget.style.boxShadow = `0 0 30px ${c.accent}33`;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: c.accent, marginBottom: 6 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
