import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于项目",
  description: "了解咖啡大师项目背后的故事、作者介绍与 HuggingFace 开源资源",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero + Space CTA */}
        <div className="text-center mb-16">
          <span className="text-6xl mb-4 block">☕</span>
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-900 mb-4">
            咖啡大师
          </h1>
          <p className="text-xl text-coffee-600 max-w-2xl mx-auto mb-8">
            咖啡领域 AI 小模型，基于 Qwen2.5-3B 微调训练
          </p>
          <a
            href="https://huggingface.co/spaces/ynanxiu/qwen25-3b-coffee-chat-gguf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-caramel-400 to-caramel-600 hover:from-caramel-500 hover:to-caramel-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <span>🤗</span>
            在线体验 Coffee Master
            <svg
              className="w-5 h-5"
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

        {/* Journey */}
        <section className="bg-white rounded-xl shadow-md border border-coffee-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🛤️</span>
            诞生历程
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-coffee-200" />
            {[
              {
                step: "01",
                title: "数据蒸馏",
                desc: "从海量咖啡领域资料中提取高质量训练数据",
              },
              {
                step: "02",
                title: "微调训练",
                desc: "基于 Qwen2.5-3B 进行咖啡领域专项 LoRA 微调",
              },
              {
                step: "03",
                title: "模型量化",
                desc: "将模型量化为 GGUF 格式，降低推理资源需求",
              },
              {
                step: "04",
                title: "部署上线",
                desc: "构建 FastAPI 后端 + Next.js 前端，提供完整的对话体验",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative flex gap-4 mb-8 last:mb-0"
              >
                <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                  {item.step}
                </div>
                <div className="pt-0.5">
                  <h3 className="font-semibold text-coffee-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-coffee-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HuggingFace Model Matrix */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🤗</span>
            HuggingFace 开源资源
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Original LoRA Model */}
            <a
              href="https://huggingface.co/ynanxiu/qwen25-3b-coffee-lora-gguf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md border border-coffee-200 p-6 hover:shadow-lg hover:border-coffee-400 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🧠</span>
                <h3 className="font-semibold text-coffee-900">
                  微调模型 (LoRA)
                </h3>
              </div>
              <p className="text-coffee-600 text-sm mb-4">
                基于 Qwen2.5-3B 的咖啡领域 LoRA 微调权重，包含完整的微调参数。
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-caramel-100 text-caramel-800 text-xs rounded-full">
                  LoRA
                </span>
                <span className="px-2 py-0.5 bg-caramel-50 text-caramel-700 text-xs rounded-full">
                  3B
                </span>
                <span className="px-2 py-0.5 bg-caramel-100 text-caramel-800 text-xs rounded-full">
                  Safetensors
                </span>
              </div>
              <div className="text-xs text-coffee-500 truncate group-hover:text-coffee-700 transition-colors">
                ynanxiu/qwen25-3b-coffee-lora-gguf
              </div>
            </a>

            {/* Quantized GGUF Model */}
            <a
              href="https://huggingface.co/ynanxiu/qwen25-3b-coffee-lora-gguf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md border border-coffee-200 p-6 hover:shadow-lg hover:border-coffee-400 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚡</span>
                <h3 className="font-semibold text-coffee-900">
                  量化模型 (GGUF)
                </h3>
              </div>
              <p className="text-coffee-600 text-sm mb-4">
                Q4_K_M 量化版本，显著降低显存需求，支持
                llama.cpp / Ollama 直接加载推理。
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-caramel-100 text-caramel-800 text-xs rounded-full">
                  GGUF
                </span>
                <span className="px-2 py-0.5 bg-caramel-50 text-caramel-700 text-xs rounded-full">
                  Q4_K_M
                </span>
                <span className="px-2 py-0.5 bg-caramel-100 text-caramel-800 text-xs rounded-full">
                  ChatML
                </span>
              </div>
              <div className="text-xs text-coffee-500 truncate group-hover:text-coffee-700 transition-colors">
                ynanxiu/qwen25-3b-coffee-lora-gguf
              </div>
            </a>

            {/* Dataset */}
            <a
              href="https://huggingface.co/datasets/ynanxiu/coffee-barista-dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md border border-coffee-200 p-6 hover:shadow-lg hover:border-coffee-400 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-coffee-900">训练数据集</h3>
              </div>
              <p className="text-coffee-600 text-sm mb-4">
                咖啡领域 SFT 监督微调数据集，涵盖咖啡知识问答、冲煮技巧等专业内容。
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 bg-caramel-50 text-caramel-700 text-xs rounded-full">
                  SFT
                </span>
                <span className="px-2 py-0.5 bg-caramel-50 text-caramel-700 text-xs rounded-full">
                  Coffee
                </span>
                <span className="px-2 py-0.5 bg-caramel-100 text-caramel-800 text-xs rounded-full">
                  中文
                </span>
              </div>
              <div className="text-xs text-coffee-500 truncate group-hover:text-coffee-700 transition-colors">
                ynanxiu/coffee-barista-dataset
              </div>
            </a>
          </div>
        </section>

        {/* Author */}
        <section className="bg-white rounded-xl shadow-md border border-coffee-200 p-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">👨‍💻</span>
            关于作者
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-coffee-900 mb-2">男秀</h3>
              <p className="text-coffee-600 text-sm mb-4">
                Python 开发工程师 / AI 应用探索者
              </p>
              <p className="text-coffee-700 leading-relaxed mb-4">
                咖啡大师小模型诞生于<strong>开智学堂</strong>的零基础开发大模型课程。
                从数据蒸馏、微调训练、量化到部署上线，经历了完整的大模型开发流程，
                最终打磨出这个专注于咖啡领域的 AI 助手。
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://yannanxiu.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-coffee-100 text-coffee-800 rounded-lg text-sm hover:bg-coffee-200 transition-colors"
                >
                  🌐 个人博客
                </a>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-caramel-50 text-caramel-800 rounded-lg text-sm">
                  📱 公众号：秀编程
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
