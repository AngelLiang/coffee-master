import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "咖啡大师 — 咖啡领域 AI 小模型",
    template: "%s | 咖啡大师",
  },
  description:
    "咖啡领域 AI 小模型，基于 Qwen2.5-3B 微调，提供专业的咖啡知识问答与建议。",
  keywords: ["咖啡", "AI", "咖啡知识", "咖啡大师", "小模型", "Qwen2.5-3B"],
  authors: [{ name: "男秀" }],
  openGraph: {
    title: "咖啡大师 — 咖啡领域 AI 小模型",
    description: "咖啡领域 AI 小模型，基于 Qwen2.5 微调，提供专业的咖啡知识问答与建议。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
