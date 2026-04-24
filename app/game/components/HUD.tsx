"use client";

import { useEffect, useState } from "react";
import { useGame } from "@/lib/store";

export default function HUD() {
  const phase = useGame((s) => s.phase);
  const score = useGame((s) => s.score);
  const kills = useGame((s) => s.kills);
  const shots = useGame((s) => s.shots);
  const streakLabel = useGame((s) => s.streakLabel);
  const lastKillAt = useGame((s) => s.lastKillAt);
  const start = useGame((s) => s.start);
  const reset = useGame((s) => s.reset);

  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const onChange = () => setLocked(!!document.pointerLockElement);
    document.addEventListener("pointerlockchange", onChange);
    return () => document.removeEventListener("pointerlockchange", onChange);
  }, []);

  const enterGame = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      (canvas as HTMLCanvasElement).requestPointerLock();
    }
    if (phase !== "playing") start();
  };

  const accuracy = shots > 0 ? Math.round((kills / shots) * 100) : 0;

  return (
    <>
      {/* Crosshair */}
      {locked && phase === "playing" && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            width: 18,
            height: 18,
          }}
        >
          <div style={crossStyle("h")} />
          <div style={crossStyle("v")} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 3,
              height: 3,
              background: "#5ab9ff",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 6px #5ab9ff",
            }}
          />
        </div>
      )}

      {/* Top bar: kills + score */}
      {phase === "playing" && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 40,
            padding: "12px 28px",
            background: "rgba(5,8,16,0.6)",
            border: "1px solid rgba(90,185,255,0.35)",
            borderRadius: 4,
            backdropFilter: "blur(8px)",
            fontFamily: '"SF Mono", "Consolas", monospace',
            letterSpacing: 2,
          }}
        >
          <Stat label="KILLS" value={kills.toString().padStart(2, "0")} accent="#ff4d7a" />
          <Stat label="SCORE" value={score.toString()} accent="#5ab9ff" />
          <Stat label="ACC" value={`${accuracy}%`} accent="#a3f7bf" />
        </div>
      )}

      {/* Streak popup */}
      {streakLabel && performance.now() - lastKillAt < 1800 && (
        <div
          style={{
            position: "absolute",
            top: "32%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 54,
            fontWeight: 900,
            letterSpacing: 6,
            color: "#ffd66b",
            textShadow: "0 0 24px #ff8c00, 0 4px 0 #000",
            fontFamily: '"Impact", sans-serif',
            animation: "streakPop 0.4s ease-out",
          }}
        >
          {streakLabel}
        </div>
      )}

      {/* AI Agent thinking panel (left side) */}
      {phase === "playing" && <AgentPanel />}

      {/* Idle screen */}
      {phase === "idle" && (
        <Overlay>
          <h1
            style={{
              fontSize: 64,
              letterSpacing: 8,
              margin: 0,
              background: "linear-gradient(90deg,#5ab9ff,#ff4d7a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 900,
            }}
          >
            AI AGENT RANGE
          </h1>
          <p style={{ opacity: 0.7, fontSize: 14, letterSpacing: 3, marginTop: 10 }}>
            你的对手是 7 个 AI AGENT · 看看谁更快
          </p>
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12, fontSize: 13, opacity: 0.75, fontFamily: '"SF Mono", monospace' }}>
            <div>WASD · 移动</div>
            <div>鼠标 · 瞄准</div>
            <div>左键 · 开火</div>
            <div>ESC · 退出</div>
          </div>
          <button onClick={enterGame} style={btn}>
            点击进入 →
          </button>
        </Overlay>
      )}

      {/* Not locked but playing - prompt to click to resume */}
      {phase === "playing" && !locked && (
        <Overlay>
          <p style={{ fontSize: 18, letterSpacing: 3, opacity: 0.8 }}>按下鼠标继续</p>
          <button onClick={enterGame} style={btn}>
            继续 →
          </button>
        </Overlay>
      )}

      {/* Victory screen */}
      {phase === "victory" && (
        <Overlay>
          <h1
            style={{
              fontSize: 88,
              letterSpacing: 12,
              margin: 0,
              background: "linear-gradient(90deg,#ffd66b,#ff4d7a,#5ab9ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 900,
              animation: "victoryPulse 1.2s ease-in-out infinite",
            }}
          >
            VICTORY
          </h1>
          <div style={{ marginTop: 30, display: "flex", gap: 60, fontFamily: '"SF Mono", monospace' }}>
            <Stat label="KILLS" value={kills.toString()} accent="#ff4d7a" big />
            <Stat label="SCORE" value={score.toString()} accent="#5ab9ff" big />
            <Stat label="ACCURACY" value={`${accuracy}%`} accent="#a3f7bf" big />
          </div>
          <button onClick={() => { reset(); enterGame(); }} style={{ ...btn, marginTop: 40 }}>
            再来一局 ↻
          </button>
        </Overlay>
      )}

      <style>{`
        @keyframes streakPop {
          0% { transform: translateX(-50%) scale(0.4); opacity: 0; }
          50% { transform: translateX(-50%) scale(1.2); opacity: 1; }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        @keyframes victoryPulse {
          0%, 100% { filter: drop-shadow(0 0 20px #ff4d7a); }
          50% { filter: drop-shadow(0 0 40px #5ab9ff); }
        }
      `}</style>
    </>
  );
}

function Stat({ label, value, accent, big }: { label: string; value: string; accent: string; big?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: big ? 14 : 10, letterSpacing: 3, opacity: 0.6 }}>{label}</div>
      <div style={{ fontSize: big ? 48 : 22, color: accent, fontWeight: 700, textShadow: `0 0 12px ${accent}` }}>
        {value}
      </div>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, rgba(10,15,28,0.7), rgba(5,8,16,0.95))",
        backdropFilter: "blur(4px)",
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
}

const btn: React.CSSProperties = {
  marginTop: 40,
  padding: "16px 44px",
  background: "linear-gradient(90deg,#5ab9ff,#ff4d7a)",
  border: "none",
  color: "#05070d",
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: 4,
  cursor: "pointer",
  borderRadius: 2,
  boxShadow: "0 0 30px rgba(90,185,255,0.5)",
};

function crossStyle(axis: "h" | "v"): React.CSSProperties {
  const common = {
    position: "absolute" as const,
    background: "#5ab9ff",
    boxShadow: "0 0 4px #5ab9ff",
  };
  return axis === "h"
    ? { ...common, top: "50%", left: 0, right: 0, height: 1.5, transform: "translateY(-50%)" }
    : { ...common, left: "50%", top: 0, bottom: 0, width: 1.5, transform: "translateX(-50%)" };
}

const AGENT_THOUGHTS = [
  "Agent-03 > 检测到玩家 → 寻找掩体",
  "Agent-05 > 换弹中 → 请求掩护",
  "Agent-02 > 绕后路径规划: W→N→E",
  "Agent-07 > 听到脚步声 → 预瞄入口",
  "Agent-01 > 血量低 → 撤退到补给点",
  "Agent-04 > 目标视线丢失 → 搜索扇形展开",
  "Agent-06 > 队友阵亡 → 警戒级别 ↑",
  "Agent-03 > 估算玩家位置 (x:+12,z:-18)",
  "Agent-05 > 切换武器: 步枪 → 手枪",
  "Agent-02 > 协同攻击: 与 Agent-04 夹击",
];

function AgentPanel() {
  const [lines, setLines] = useState<string[]>([AGENT_THOUGHTS[0]]);

  useEffect(() => {
    let i = 1;
    const iv = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, AGENT_THOUGHTS[i % AGENT_THOUGHTS.length]];
        i++;
        return next.slice(-6);
      });
    }, 1400);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 20,
        bottom: 20,
        width: 340,
        padding: 14,
        background: "rgba(5,8,16,0.72)",
        border: "1px solid rgba(90,185,255,0.35)",
        borderRadius: 4,
        backdropFilter: "blur(8px)",
        fontFamily: '"SF Mono", "Consolas", monospace',
        fontSize: 11,
        lineHeight: 1.8,
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: 3, color: "#5ab9ff", marginBottom: 6 }}>
        ◉ AGENT THOUGHTS · LIVE
      </div>
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            color: i === lines.length - 1 ? "#a3f7bf" : "rgba(255,255,255,0.5)",
            opacity: 0.4 + (i / lines.length) * 0.6,
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
}
