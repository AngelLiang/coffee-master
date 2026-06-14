"use client";

import ChatInterface from "@/components/ChatInterface";
import ProjectCard from "@/components/ProjectCard";

const HF_RESOURCES = [
  {
    href: "https://huggingface.co/spaces/ynanxiu/qwen25-15b-coffee-chat-gguf",
    emoji: "🤗",
    label: "在线体验 (Space)",
    sublabel: "qwen25-15b-coffee-chat-gguf",
    gradient: "from-caramel-50 to-caramel-100",
    border: "border-caramel-200 hover:border-caramel-400",
  },
  {
    href: "https://huggingface.co/ynanxiu/qwen25-15b-coffee-lora-v5",
    emoji: "🧠",
    label: "微调模型 (LoRA)",
    sublabel: "ynanxiu/qwen25-15b-coffee-lora-v5",
    gradient: "from-caramel-50 to-caramel-100",
    border: "border-caramel-200 hover:border-caramel-400",
  },
  {
    href: "https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf",
    emoji: "⚡",
    label: "量化模型 (GGUF)",
    sublabel: "ynanxiu/qwen25-15b-coffee-v5-gguf",
    gradient: "from-caramel-50 to-caramel-100",
    border: "border-caramel-200 hover:border-caramel-400",
  },
  {
    href: "https://huggingface.co/datasets/ynanxiu/coffee-sft-dataset",
    emoji: "📊",
    label: "训练数据集",
    sublabel: "ynanxiu/coffee-sft-dataset",
    gradient: "from-caramel-50 to-caramel-100",
    border: "border-caramel-200 hover:border-caramel-400",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <div className="bg-coffee-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-6xl mb-4 block">☕</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              咖啡大师
            </h1>
            <p className="text-xl text-coffee-200 max-w-2xl mx-auto">
              咖啡领域 AI 小模型，基于 Qwen2.5-1.5B 微调，模仿金牌咖啡师提供专业知识问答
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Project Intro */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-coffee-200 p-6 h-full">
              <h2 className="text-2xl font-bold text-coffee-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📋</span>
                项目简介
              </h2>
              <p className="text-coffee-700 leading-relaxed mb-4">
                基于 Qwen2.5-1.5B 微调，模仿金牌咖啡师的角色。
                从咖啡豆产地到萃取技巧，提供深度、专业的咖啡知识问答。
              </p>

              <div className="flex flex-col gap-2 mb-6">
                {[
                  { icon: "🔒", text: "本地运行，数据不上云", desc: "" },
                  { icon: "💰", text: "免费对话，无 Token 计费", desc: "" },
                  { icon: "🚀", text: "Space 在线 / Docker 一键部署", desc: "" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2 text-sm">
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    <div>
                      <span className="font-medium text-coffee-900">{item.text}</span>
                      {item.desc && <span className="text-coffee-500 ml-1">{item.desc}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-coffee-800 flex items-center gap-2">
                  <span>🤗</span>
                  HuggingFace 开源资源
                </h3>
                <div className="space-y-3">
                  {HF_RESOURCES.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r ${r.gradient} border ${r.border} transition-colors group`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {r.emoji}
                      </span>
                      <div>
                        <div className="font-medium text-coffee-900">
                          {r.label}
                        </div>
                        <div className="text-xs text-coffee-600 truncate max-w-[200px] sm:max-w-xs">
                          {r.sublabel}
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 ml-auto text-coffee-400 group-hover:text-coffee-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Chat */}
          <div className="lg:col-span-3">
            <ChatInterface />
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            核心特性
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectCard
              title="专业知识问答"
              description="基于 Qwen2.5-1.5B 微调，模仿金牌咖啡师角色。从豆种产地到冲煮参数，提供专业、精准的解答。"
              links={[
                {
                  label: "查看微调模型",
                  href: "https://huggingface.co/ynanxiu/qwen25-15b-coffee-lora-v5",
                  emoji: "🧠",
                },
              ]}
            />
            <ProjectCard
              title="零成本无限对话"
              description="支持 HuggingFace Space 在线体验和本地 Docker 部署，无需 API 密钥。一次部署永久免费，不按 Token 计费。"
              links={[
                {
                  label: "在线体验",
                  href: "https://huggingface.co/spaces/ynanxiu/qwen25-15b-coffee-chat-gguf",
                  emoji: "🤗",
                },
              ]}
            />
            <ProjectCard
              title="本地部署，隐私可控"
              description="基于 llama-cpp-python 本地推理，对话数据完全在本地处理，无需联网。支持离线运行，你的咖啡探索完全属于你自己。"
              links={[
                {
                  label: "下载模型权重",
                  href: "https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf",
                  emoji: "⬇️",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
