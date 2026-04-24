"use client";

import { useEffect, useState, useCallback } from "react";
import SlideCover from "./slides/SlideCover";
import SlideAgentVsChat from "./slides/SlideAgentVsChat";
import SlideGameDemo from "./slides/SlideGameDemo";
import SlidePrompt from "./slides/SlidePrompt";
import SlideCapabilities from "./slides/SlideCapabilities";
import SlideClosing from "./slides/SlideClosing";

const slides = [
  { id: "cover", Component: SlideCover, label: "封面" },
  { id: "vs-chat", Component: SlideAgentVsChat, label: "Agent vs Chat" },
  { id: "demo", Component: SlideGameDemo, label: "现场 DEMO" },
  { id: "prompt", Component: SlidePrompt, label: "一句话造游戏" },
  { id: "capabilities", Component: SlideCapabilities, label: "还能做什么" },
  { id: "closing", Component: SlideClosing, label: "结语" },
];

export default function Home() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, slides.length - 1)), []);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (/^[1-9]$/.test(e.key)) {
        const n = parseInt(e.key, 10) - 1;
        if (n < slides.length) setIndex(n);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const down = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const up = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 60) {
        if (dx < 0) next();
        else prev();
      }
    };
    window.addEventListener("touchstart", down);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("touchstart", down);
      window.removeEventListener("touchend", up);
    };
  }, [next, prev]);

  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      {/* Background layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(90,185,255,0.12), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,77,122,0.12), transparent 50%), var(--bg)",
        }}
      />
      <Grid />

      {/* Slides */}
      {slides.map(({ id, Component }, i) => (
        <div
          key={id}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === index ? 1 : 0,
            transform: i === index ? "translateX(0)" : i < index ? "translateX(-40px)" : "translateX(40px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            pointerEvents: i === index ? "auto" : "none",
          }}
        >
          <Component active={i === index} onNext={next} />
        </div>
      ))}

      {/* Footer */}
      <Footer index={index} total={slides.length} onDot={setIndex} onNext={next} onPrev={prev} />
    </main>
  );
}

function Grid() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(90,185,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(90,185,255,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, #000 40%, transparent 80%)",
      }}
    />
  );
}

function Footer({
  index,
  total,
  onDot,
  onNext,
  onPrev,
}: {
  index: number;
  total: number;
  onDot: (n: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <button onClick={onPrev} style={navBtn} aria-label="prev">
        ←
      </button>
      <div style={{ display: "flex", gap: 10, pointerEvents: "auto" }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            aria-label={`slide ${i + 1}`}
            style={{
              width: i === index ? 28 : 8,
              height: 8,
              border: "none",
              borderRadius: 4,
              background: i === index ? "var(--blue)" : "rgba(255,255,255,0.25)",
              transition: "all 0.3s",
              cursor: "pointer",
              boxShadow: i === index ? "0 0 10px var(--blue)" : "none",
            }}
          />
        ))}
      </div>
      <button onClick={onNext} style={navBtn} aria-label="next">
        →
      </button>
      <div
        style={{
          position: "absolute",
          right: 24,
          fontSize: 11,
          letterSpacing: 2,
          color: "var(--muted)",
          fontFamily: '"SF Mono", monospace',
          pointerEvents: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

const navBtn: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 18,
  border: "1px solid var(--line)",
  background: "rgba(10,15,28,0.6)",
  color: "var(--ink)",
  cursor: "pointer",
  fontSize: 16,
  backdropFilter: "blur(8px)",
  pointerEvents: "auto",
};
