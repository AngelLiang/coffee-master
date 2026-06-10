"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Extract thinking content and emotions from assistant's response
function parseResponse(content: string): {
  main: string;
  thinking: string | null;
  emotions: string[];
} {
  // Extract thinking
  let main = content;
  let thinking: string | null = null;
  const thinkingMatch = content.match(/<think>([\s\S]*?)<\/think>/);
  if (thinkingMatch) {
    thinking = thinkingMatch[1].trim();
    main = content.replace(/<think>[\s\S]*?<\/think>/, "").trim();
  }

  // Extract emotions like （笑着摆摆手）
  const emotions: string[] = [];
  main = main.replace(/（([^）]+)）/g, (_match, emotion) => {
    emotions.push(emotion);
    return "";
  });

  return { main, thinking, emotions };
}

function ThinkingBlock({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-coffee-500 hover:text-coffee-700 transition-colors"
      >
        <svg
          className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        💡 思考过程
      </button>
      {expanded && (
        <div className="mt-1 p-2 bg-gray-100 rounded text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      )}
    </div>
  );
}

function getApiBase(): string {
  if (typeof window === "undefined") return "/api";
  if (window.location.origin.includes("localhost")) {
    return "http://localhost:8000/api";
  }
  return "/api";
}

const allQuickPrompts = [
  { icon: "😋", text: "咖啡太苦了怎么办？" },
  { icon: "🌡️", text: "手冲咖啡的水温建议" },
  { icon: "🫘", text: "不同咖啡豆的风味特点" },
  { icon: "⚖️", text: "咖啡和水的比例推荐" },
  { icon: "💡", text: "新手适合用什么器具？" },
  { icon: "🥛", text: "拿铁和卡布奇诺的区别" },
  { icon: "🌍", text: "耶加雪菲和曼特宁哪个好？" },
  { icon: "🔥", text: "浅烘和深烘风味有什么不同？" },
  { icon: "☕", text: "意式浓缩怎么萃取才好喝？" },
  { icon: "🧊", text: "冷萃咖啡怎么做？" },
  { icon: "🎨", text: "拉花需要什么技巧？" },
  { icon: "🏆", text: "精品咖啡和商业咖啡的区别" },
  { icon: "⏱️", text: "手冲咖啡的萃取时间怎么控制？" },
  { icon: "🫧", text: "法压壶和手冲哪个更适合新手？" },
  { icon: "🌿", text: "低因咖啡真的没有咖啡因吗？" },
  { icon: "🍷", text: "怎么品尝咖啡的风味层次？" },
  { icon: "🏔️", text: "海拔对咖啡豆品质有什么影响？" },
  { icon: "📦", text: "咖啡豆怎么保存最好？" },
  { icon: "🎓", text: "SCA 咖啡认证有哪些？" },
  { icon: "🇪🇹", text: "埃塞俄比亚咖啡有什么特色？" },
  { icon: "🇨🇴", text: "哥伦比亚咖啡豆的风味特征" },
  { icon: "🇧🇷", text: "巴西咖啡豆适合做什么？" },
  { icon: "🇯🇵", text: "日本手冲咖啡有什么讲究？" },
  { icon: "🇻🇳", text: "越南蛋咖啡是怎么回事？" },
  { icon: "🇹🇷", text: "土耳其咖啡怎么煮？" },
  { icon: "🌧️", text: "水洗和日晒处理法有什么区别？" },
  { icon: "🍯", text: "蜜处理是什么意思？" },
  { icon: "🧪", text: "厌氧发酵处理的咖啡什么风味？" },
  { icon: "🫗", text: "什么是杯测？怎么做？" },
  { icon: "👃", text: "如何训练咖啡品鉴的嗅觉？" },
  { icon: "👅", text: "咖啡的酸味是好是坏？" },
  { icon: "🤎", text: "咖啡的醇厚度是什么意思？" },
  { icon: "🍬", text: "为什么有些咖啡喝起来有甜感？" },
  { icon: "🌸", text: "什么是咖啡的花香风味？" },
  { icon: "🍫", text: "哪些咖啡豆有巧克力风味？" },
  { icon: "🫐", text: "什么咖啡能喝到莓果味？" },
  { icon: "🥜", text: "坚果风味的咖啡有哪些？" },
  { icon: "🍋", text: "咖啡里的柑橘酸从哪来？" },
  { icon: "🪵", text: "橡木桶处理的咖啡什么味道？" },
  { icon: "⚙️", text: "磨豆机刀盘平刀和锥刀区别？" },
  { icon: "🔍", text: "怎么判断咖啡粉粗细是否合适？" },
  { icon: "⏳", text: "闷蒸是什么意思？为什么要闷蒸？" },
  { icon: "🔄", text: "手冲注水手法有哪些？" },
  { icon: "🎯", text: "怎么避免手冲萃取不足？" },
  { icon: "💧", text: "粉水比 1:15 和 1:16 差别大吗？" },
  { icon: "🧊", text: "冰手冲怎么做才好喝？" },
  { icon: "🥤", text: "Dirty 咖啡怎么做？" },
  { icon: "🍹", text: "阿芙佳朵是什么？" },
  { icon: "🍺", text: "什么是爱尔兰咖啡？" },
  { icon: "🧋", text: "咖啡和茶可以混搭吗？" },
  { icon: "🫖", text: "Dirty Tea 和 Dirty 咖啡有什么关系？" },
  { icon: "💸", text: "为什么精品咖啡这么贵？" },
  { icon: "🏷️", text: "咖啡豆包装上的信息怎么看？" },
  { icon: "📅", text: "咖啡豆的赏味期是多久？" },
  { icon: "❄️", text: "咖啡豆可以放冰箱保存吗？" },
  { icon: "🔬", text: "烘焙度怎么区分？City Roast 是什么？" },
  { icon: "📈", text: "咖啡豆烘焙曲线是什么？" },
  { icon: "🌳", text: "阿拉比卡和罗布斯塔有什么区别？" },
  { icon: "☕", text: "什么是 SOE 咖啡？" },
  { icon: "🤝", text: "拼配咖啡豆的目的是什么？" },
  { icon: "🏠", text: "在家开咖啡馆需要什么设备？" },
  { icon: "💪", text: "喝咖啡能减肥吗？" },
  { icon: "😴", text: "为什么咖啡对我没有提神效果？" },
  { icon: "🤰", text: "孕妇可以喝咖啡吗？" },
  { icon: "❤️", text: "每天喝多少咖啡是安全的？" },
  { icon: "🦷", text: "喝咖啡会伤胃和导致牙齿变黄吗？" },
  { icon: "🧠", text: "咖啡因是怎么起作用的？" },
  { icon: "⏰", text: "一天中什么时候喝咖啡最好？" },
  { icon: "🏃", text: "运动前喝咖啡有帮助吗？" },
  { icon: "🧘", text: "咖啡冥想是什么？" },
  { icon: "🐾", text: "猫屎咖啡真的好吗？" },
  { icon: "🐘", text: "黑象牙咖啡和猫屎咖啡有什么不同？" },
  { icon: "🌾", text: "什么是雨林联盟认证咖啡？" },
  { icon: "♻️", text: "咖啡渣有什么妙用？" },
  { icon: "🧹", text: "咖啡器具怎么清洗保养？" },
  { icon: "📊", text: "怎么建立咖啡品鉴笔记？" },
  { icon: "🗺️", text: "世界主要咖啡产区有哪些？" },
  { icon: "✈️", text: "有哪些值得去的咖啡产地旅行？" },
];

function getRandomPrompts(count: number) {
  const shuffled = [...allQuickPrompts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [displayPrompts, setDisplayPrompts] = useState(() => getRandomPrompts(6));

  const handleRefreshPrompts = useCallback(() => {
    setDisplayPrompts(getRandomPrompts(6));
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [sessionId] = useState(() => crypto.randomUUID());

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      setError(null);

      const userMessage = text.trim();
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
      setIsLoading(true);

      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      abortControllerRef.current = new AbortController();
      const apiBase = getApiBase();

      try {
        const response = await fetch(`${apiBase}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage, session_id: sessionId }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.error || `HTTP ${response.status}: ${response.statusText}`
          );
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let buffer = "";

        if (!reader) {
          throw new Error("无法读取响应流");
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          // Keep the last incomplete line in buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const dataStr = trimmed.slice(5).trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);
              if (data.done) {
                setIsLoading(false);
                break;
              }
              if (typeof data.token === "string") {
                accumulatedText += data.token;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIdx = newMessages.length - 1;
                  if (lastIdx >= 0 && newMessages[lastIdx].role === "assistant") {
                    newMessages[lastIdx] = {
                      ...newMessages[lastIdx],
                      content: accumulatedText,
                    };
                  }
                  return newMessages;
                });
              }
            } catch {
              // Ignore malformed JSON
            }
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.name === "AbortError"
              ? "请求已取消"
              : err.message
            : "连接出现问题";

        console.error("Chat error:", err);
        setError(errorMessage);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIdx = newMessages.length - 1;
          if (lastIdx >= 0 && newMessages[lastIdx].role === "assistant") {
            newMessages[lastIdx] = {
              ...newMessages[lastIdx],
              content: `抱歉，${errorMessage}，请稍后重试。`,
            };
          }
          return newMessages;
        });
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const handleReset = useCallback(async () => {
    setMessages([]);
    setInput("");
    setError(null);
    const apiBase = getApiBase();
    try {
      await fetch(`${apiBase}/chat/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
    } catch {
      // Ignore reset errors
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-coffee-200 overflow-hidden">
      {/* Chat header */}
      <div className="bg-coffee-800 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <span className="font-semibold">AI 咖啡大师</span>
          <span className="text-xs bg-caramel-500 text-white px-2 py-0.5 rounded-full">
            在线
          </span>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-coffee-200 hover:text-white transition-colors flex items-center gap-1"
          title="重置对话"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          重置
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[600px]">
        {messages.length === 0 && (
          <div className="text-center text-coffee-400 py-12">
            <span className="text-5xl mb-4 block drop-shadow-lg">☕</span>
            <p className="text-xl font-bold text-coffee-800 mb-2">今天想聊点什么？</p>
            <p className="text-sm mb-6">
              从咖啡豆产地到萃取技巧，随时为你解答
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto mb-4">
              {displayPrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => handleSend(prompt.text)}
                  className="px-3 py-1.5 text-xs bg-coffee-100 hover:bg-coffee-200 hover:-translate-y-0.5 text-coffee-800 rounded-full border border-coffee-200 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>{prompt.icon}</span>
                  {prompt.text}
                </button>
              ))}
            </div>
            <button
              onClick={handleRefreshPrompts}
              className="text-xs text-coffee-500 hover:text-coffee-700 transition-colors flex items-center gap-1 mx-auto"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              换一批
            </button>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-coffee-700 flex items-center justify-center text-white text-sm flex-shrink-0">
                🤖
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-coffee-600 text-white"
                  : "bg-coffee-50 text-coffee-900 border border-coffee-200"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="markdown-body">
                  {(() => {
                    const { main, thinking, emotions } = parseResponse(msg.content);
                    return (
                      <>
                        {thinking && <ThinkingBlock content={thinking} />}
                        {emotions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {emotions.map((e, i) => (
                              <span key={i} className="inline-block text-xs text-coffee-500 bg-coffee-100 px-2 py-0.5 rounded-full italic">
                                {e}
                              </span>
                            ))}
                          </div>
                        )}
                        <ReactMarkdown>{main || (isLoading ? "思考中..." : "")}</ReactMarkdown>
                      </>
                    );
                  })()}
                </div>
              ) : (
                msg.content
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-coffee-400 flex items-center justify-center text-white text-sm flex-shrink-0">
                👤
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          错误: {error}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-coffee-200 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2.5 bg-coffee-700 text-white rounded-lg hover:bg-coffee-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isLoading ? "..." : "发送"}
          </button>
        </form>
      </div>
    </div>
  );
}
