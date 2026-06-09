import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description: "了解咖啡大师项目背后的故事、作者介绍与技术架构",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-6xl mb-4 block">☕</span>
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-900 mb-4">
            关于我们
          </h1>
          <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
            咖啡领域 AI 小模型，基于 Qwen2.5 微调训练
          </p>
        </div>

        {/* Author */}
        <section className="bg-white rounded-xl shadow-md border border-coffee-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">👨‍💻</span>
            关于作者
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-coffee-900 mb-2">男秀</h3>
              <p className="text-coffee-600 text-sm mb-4">Python 开发工程师 / AI 应用探索者</p>
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
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-sm">
                  📱 公众号：秀编程
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="bg-white rounded-xl shadow-md border border-coffee-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🛤️</span>
            诞生历程
          </h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-coffee-200" />
            {[
              { step: "01", title: "数据蒸馏", desc: "从海量咖啡领域资料中提取高质量训练数据" },
              { step: "02", title: "微调训练", desc: "基于 Qwen2.5-15B 进行咖啡领域专项微调" },
              { step: "03", title: "模型量化", desc: "将模型量化为 GGUF 格式，降低推理资源需求" },
              { step: "04", title: "部署上线", desc: "构建 FastAPI 后端 + Next.js 前端，提供完整的对话体验" },
            ].map((item) => (
              <div key={item.step} className="relative flex gap-4 mb-8 last:mb-0">
                <div className="w-8 h-8 rounded-full bg-coffee-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                  {item.step}
                </div>
                <div className="pt-0.5">
                  <h3 className="font-semibold text-coffee-900 mb-1">{item.title}</h3>
                  <p className="text-coffee-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Model */}
        <section className="bg-white rounded-xl shadow-md border border-coffee-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🤗</span>
            模型信息
          </h2>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-coffee-900 mb-2">
              ynanxiu/qwen25-15b-coffee-v5-gguf
            </h3>
            <p className="text-coffee-700 text-sm mb-4">
              基于 Qwen2.5-15B 架构，经过咖啡领域数据微调的 GGUF 格式模型。
              采用 ChatML 对话格式，支持中文交互。
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                Qwen2.5
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                15B 参数
              </span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                GGUF
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                ChatML
              </span>
            </div>
            <a
              href="https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <span>🤗</span>
              在 HuggingFace 上查看
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="bg-white rounded-xl shadow-md border border-coffee-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">⚙️</span>
            技术架构
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-coffee-800 mb-2">后端</h3>
              <ul className="space-y-2 text-coffee-700">
                <li className="flex items-center gap-2"><span className="text-sm">🐍</span>Python 3.11</li>
                <li className="flex items-center gap-2"><span className="text-sm">⚡</span>FastAPI</li>
                <li className="flex items-center gap-2"><span className="text-sm">🧠</span>llama-cpp-python</li>
                <li className="flex items-center gap-2"><span className="text-sm">📡</span>SSE 流式响应</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-coffee-800 mb-2">前端</h3>
              <ul className="space-y-2 text-coffee-700">
                <li className="flex items-center gap-2"><span className="text-sm">⚛️</span>Next.js 15 (App Router)</li>
                <li className="flex items-center gap-2"><span className="text-sm">💅</span>Tailwind CSS</li>
                <li className="flex items-center gap-2"><span className="text-sm">🔤</span>TypeScript</li>
                <li className="flex items-center gap-2"><span className="text-sm">📝</span>Markdown 静态博客</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="bg-white rounded-xl shadow-md border border-coffee-200 p-8">
          <h2 className="text-2xl font-bold text-coffee-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🔗</span>
            相关链接
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://yannanxiu.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-coffee-200 hover:border-coffee-400 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🌐</span>
              <div>
                <div className="font-medium text-coffee-900">个人博客</div>
                <div className="text-sm text-coffee-600">yannanxiu.cn</div>
              </div>
            </a>
            <a
              href="https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-coffee-200 hover:border-coffee-400 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🤗</span>
              <div>
                <div className="font-medium text-coffee-900">HuggingFace</div>
                <div className="text-sm text-coffee-600">模型下载</div>
              </div>
            </a>
            <a
              href="https://huggingface.co/datasets/ynanxiu/coffee-sft-dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-coffee-200 hover:border-coffee-400 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">📊</span>
              <div>
                <div className="font-medium text-coffee-900">训练数据集</div>
                <div className="text-sm text-coffee-600">coffee-sft-dataset</div>
              </div>
            </a>
            <a
              href="https://github.com/ynanxiu/coffee-master"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-coffee-200 hover:border-coffee-400 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🐙</span>
              <div>
                <div className="font-medium text-coffee-900">GitHub</div>
                <div className="text-sm text-coffee-600">源代码</div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
