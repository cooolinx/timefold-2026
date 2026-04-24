import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Agent 分享",
  description: "和大学同学聊聊 AI agent —— 含可玩 FPS demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
