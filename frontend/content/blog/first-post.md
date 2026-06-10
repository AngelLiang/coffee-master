---
title: "咖啡大师 v5 正式发布"
date: "2025-06-08"
description: "咖啡大师基于 Qwen2.5-15B 大模型微调，为您提供专业的咖啡知识问答服务"
tags: ["release", "coffee", "model"]
---

# 咖啡大师 v5 正式发布

我们很高兴地宣布，**咖啡大师 v5** 正式发布！

## 模型亮点

- **基于 Qwen2.5-15B**：采用业界领先的大语言模型架构
- **咖啡领域深度微调**：经过大量专业咖啡文献和知识训练
- **流式对话**：支持实时流式回复，对话体验更流畅
- **中文优化**：针对中文用户优化，回答更自然准确

## 技术特性

```python
# 示例：与咖啡大师对话
from llama_cpp import Llama

llm = Llama.from_pretrained(
    repo_id="ynanxiu/qwen25-15b-coffee-v5-gguf",
    filename="qwen25_15b-coffee-v5-q4_k_m.gguf",
    chat_format="chatml",
)
```

## 快速开始

1. 访问 [HuggingFace](https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf) 下载模型
2. 使用 `llama-cpp-python` 加载模型
3. 开始您的咖啡知识探索之旅

## 未来展望

我们将继续优化模型，计划增加以下功能：

- 更多咖啡豆产区的知识覆盖
- 冲煮参数的个性化推荐
- 与咖啡器具的联动建议

感谢您的支持与关注！
