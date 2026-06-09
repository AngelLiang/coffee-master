"use client";

import ChatInterface from "@/components/ChatInterface";
import ProjectCard from "@/components/ProjectCard";

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
              咖啡领域 AI 小模型，基于 Qwen2.5 微调，为您带来专业的咖啡知识与建议
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
                <span className="text-3xl">🏆</span>
                作品介绍
              </h2>
              <p className="text-coffee-700 leading-relaxed mb-6">
                咖啡大师是一款咖啡领域 AI 小模型，基于 Qwen2.5-15B 经过大量专业数据微调而成
                它能够回答关于咖啡豆选择、冲煮技巧、咖啡风味分析等各类专业问题，
                为咖啡爱好者和从业者提供可靠的知识支持。
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-coffee-800 flex items-center gap-2">
                  <span>🔗</span>
                  相关链接
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 hover:border-yellow-400 transition-colors group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      🤗
                    </span>
                    <div>
                      <div className="font-medium text-coffee-900">
                        HuggingFace 模型
                      </div>
                      <div className="text-xs text-coffee-600 truncate max-w-[200px] sm:max-w-xs">
                        ynanxiu/qwen25-15b-coffee-v5-gguf
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

                  <a
                    href="https://huggingface.co/datasets/ynanxiu/coffee-sft-dataset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-400 transition-colors group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">📊</span>
                    <div>
                      <div className="font-medium text-coffee-900">训练数据集</div>
                      <div className="text-xs text-coffee-600 truncate max-w-[200px] sm:max-w-xs">ynanxiu/coffee-sft-dataset</div>
                    </div>
                    <svg className="w-4 h-4 ml-auto text-coffee-400 group-hover:text-coffee-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>

<a
                    href="https://github.com/AngelLiang/coffee-master"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-400 transition-colors group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      🐙
                    </span>
                    <div>
                      <div className="font-medium text-coffee-900">
                        GitHub 仓库
                      </div>
                      <div className="text-xs text-coffee-600">
                        查看项目源代码
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
              description="基于 Qwen2.5-15B 经过大量咖啡领域专业数据微调，在咖啡豆选择、冲煮技巧、风味分析等场景下提供深度、准确的回答，远超通用大模型的泛泛之谈。"
              links={[
                {
                  label: "查看模型详情",
                  href: "https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf",
                  emoji: "🤗",
                },
              ]}
            />
            <ProjectCard
              title="零成本无限对话"
              description="一次部署，永久免费。无需 API 密钥，不按 Token 计费，对话再多也不产生额外费用。适合高频使用和批量推理场景。"
              links={[
                {
                  label: "快速开始部署",
                  href: "https://github.com/AngelLiang/coffee-master",
                  emoji: "🐙",
                },
              ]}
            />
            <ProjectCard
              title="本地部署，隐私可控"
              description="所有对话数据都在本机处理，不上传云端，不留下痕迹。支持离线运行，无需依赖外部网络，你的咖啡探索完全属于你自己。"
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
