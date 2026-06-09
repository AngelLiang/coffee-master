"use client";

interface QuickPromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  { icon: "😋", text: "咖啡太苦了怎么办？" },
  { icon: "🌡️", text: "手冲咖啡的水温建议" },
  { icon: "🫘", text: "不同咖啡豆的风味特点" },
  { icon: "⚖️", text: "咖啡和水的比例推荐" },
  { icon: "💡", text: "新手适合用什么器具？" },
  { icon: "🥛", text: "拿铁和卡布奇诺的区别" },
];

export default function QuickPrompts({ onSelect }: QuickPromptsProps) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-coffee-700 mb-3 flex items-center gap-2">
        <span className="text-lg">✨</span>
        快捷示例
      </h3>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt.text}
            onClick={() => onSelect(prompt.text)}
            className="px-3 py-1.5 text-xs bg-coffee-100 hover:bg-coffee-200 text-coffee-800 rounded-full border border-coffee-200 transition-colors flex items-center gap-1.5"
          >
            <span>{prompt.icon}</span>
            {prompt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
