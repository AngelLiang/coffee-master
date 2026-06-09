# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Coffee Master（咖啡大师）是一个基于 AI 的咖啡知识问答应用。后端使用 Python FastAPI + llama-cpp-python 加载经过微调的 Qwen2.5-15B 咖啡领域模型，前端使用 Next.js 15 构建聊天界面和博客系统。前后端通过 SSE（Server-Sent Events）实现流式响应。

## Common Commands

### Backend

```bash
# 开发模式（需要 uv）
uv run uvicorn backend.main:app --reload

# 运行测试
uv run pytest

# 运行单个测试文件
uv run pytest tests/test_chat.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # 开发服务器
npm run build    # 静态导出到 frontend/dist
npm run lint     # ESLint 检查
```

### E2E 测试（Playwright）

```bash
npm test           # 运行所有 E2E 测试
npm run test:ui    # Playwright UI 模式
npm run test:debug # 调试模式
```

### Docker 部署

```bash
docker build -t coffee-master .
docker run -p 8000:8000 coffee-master
```

## Architecture

### 后端（Python FastAPI）

- `backend/main.py` — 应用入口，FastAPI 实例、CORS 中间件、静态文件挂载、模型生命周期管理
- `backend/model_manager.py` — LLM 模型加载（支持 HuggingFace 下载或本地路径）、单例模式
- `backend/chat_service.py` — 聊天服务：会话管理（30 分钟 TTL 自动清理）、对话历史、流式生成
- `backend/routes/chat.py` — API 路由：`/api/health`、`/api/chat`（SSE）、`/api/chat/reset`，使用信号量控制并发
- `backend/schemas.py` — Pydantic 请求/响应模型
- `backend/config.py` — 环境变量配置（模型参数、推理参数、并发控制等）

### 前端（Next.js 15 App Router）

- `frontend/app/` — 页面路由：首页（聊天）、`/blog/`、`/blog/[slug]/`、`/about/`
- `frontend/components/` — React 组件：`ChatInterface`（核心聊天 UI + SSE 流式渲染）、`Navbar`、`Footer`、`ProjectCard`
- `frontend/content/` — Markdown 博客文章（使用 gray-matter 解析 frontmatter）
- `frontend/lib/` — 工具函数
- `frontend/next.config.ts` — 配置为静态导出（`output: "export"`）

### 数据流

用户消息 → 前端 `/api/chat` fetch → 后端获取信号量 → LLM 推理 → SSE 逐 token 流式返回 → 前端实时渲染（支持 Markdown）

## Key Configuration

模型和推理参数通过环境变量配置，默认值见 `backend/config.py`。关键变量：

- `COFFEE_MODEL_LOCAL_PATH` — 本地模型文件路径（设置后跳过 HuggingFace 下载）
- `COFFEE_MAX_CONCURRENT` — 最大并发请求数（默认 1）
- `COFFEE_N_CTX` / `COFFEE_MAX_TOKENS` / `COFFEE_TEMPERATURE` — 推理参数

## Testing

- 后端单元测试在 `tests/`，使用 `pytest-asyncio`，`conftest.py` 中 mock 了 LLM 模型
- E2E 测试在 `e2e/`，使用 Playwright，配置文件为根目录 `playwright.config.ts`
