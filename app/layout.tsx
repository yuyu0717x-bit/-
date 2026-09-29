import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "学习系统", description: "从真实学习状态出发，继续下一步。" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
