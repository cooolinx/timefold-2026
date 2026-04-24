"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BackLink() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const onChange = () => setLocked(!!document.pointerLockElement);
    document.addEventListener("pointerlockchange", onChange);
    return () => document.removeEventListener("pointerlockchange", onChange);
  }, []);

  if (locked) return null;

  return (
    <Link
      href="/"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 100,
        padding: "8px 16px",
        fontSize: 12,
        letterSpacing: 3,
        color: "#5ab9ff",
        border: "1px solid rgba(90,185,255,0.35)",
        borderRadius: 3,
        background: "rgba(5,7,13,0.7)",
        backdropFilter: "blur(6px)",
        textDecoration: "none",
        fontFamily: '"SF Mono", monospace',
      }}
    >
      ← 返回 SLIDER
    </Link>
  );
}
