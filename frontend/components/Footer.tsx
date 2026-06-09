import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-coffee-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">☕</span>
              咖啡大师
            </h3>
            <p className="text-coffee-300 text-sm">
              咖啡领域 AI 小模型，基于 Qwen2.5 微调，为您提供专业的咖啡知识。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-2">快速链接</h4>
            <ul className="space-y-1 text-sm text-coffee-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/"
                  className="hover:text-white transition-colors"
                >
                  博客
                </Link>
              </li>
              <li>
                <Link
                  href="/about/"
                  className="hover:text-white transition-colors"
                >
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="font-semibold mb-2">相关资源</h4>
            <ul className="space-y-1 text-sm text-coffee-300">
              <li>
                <a
                  href="https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  🤗 HuggingFace 模型
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/datasets/ynanxiu/coffee-sft-dataset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  📊 训练数据集
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-coffee-700 mt-8 pt-4 text-center text-sm text-coffee-400">
          © {new Date().getFullYear()} 咖啡大师. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
