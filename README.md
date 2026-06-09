# Coffee Master（咖啡大师）

基于 AI 的咖啡专业知识问答应用，使用经过微调的 Qwen2.5-15B 咖啡领域模型提供专业咖啡咨询。

## 功能特性

- AI 咖啡师对话：流式响应，支持多轮对话
- 咖啡知识博客系统
- 响应式设计，支持移动端
- Docker 一键部署

## 技术栈

- **后端**：Python 3.11 + FastAPI + llama-cpp-python
- **前端**：Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **AI 模型**：Qwen2.5-15B（咖啡领域微调，GGUF 量化）
- **测试**：pytest（后端）+ Playwright（E2E）

## 快速开始

### 环境要求

- Python 3.11+
- Node.js 20+
- [uv](https://github.com/astral-sh/uv)（Python 包管理器）

### 本地开发

**后端：**

```bash
uv sync
uv run uvicorn backend.main:app --reload
```

**前端：**

```bash
cd frontend
npm install
npm run dev
```

### Docker 部署

```bash
docker build -t coffee-master .
docker run -p 8000:8000 coffee-master
```

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `COFFEE_MODEL_LOCAL_PATH` | 空（从 HuggingFace 下载） | 本地模型文件路径 |
| `COFFEE_MODEL_REPO` | `ynanxiu/qwen25-15b-coffee-v5-gguf` | HuggingFace 模型仓库 |
| `COFFEE_MAX_CONCURRENT` | `1` | 最大并发请求数 |
| `COFFEE_N_CTX` | `2048` | 上下文窗口大小 |
| `COFFEE_MAX_TOKENS` | `512` | 最大生成 token 数 |
| `COFFEE_TEMPERATURE` | `0.7` | 生成温度 |

更多配置项参见 `backend/config.py`。

## 项目结构

```
├── backend/          # FastAPI 后端
│   ├── main.py       # 应用入口
│   ├── model_manager.py  # LLM 模型管理
│   ├── chat_service.py   # 聊天与会话管理
│   ├── routes/chat.py    # API 路由
│   ├── schemas.py        # 数据模型
│   └── config.py         # 配置
├── frontend/         # Next.js 前端
│   ├── app/          # 页面路由
│   ├── components/   # React 组件
│   ├── content/      # Markdown 博客文章
│   └── lib/          # 工具函数
├── tests/            # pytest 后端测试
├── e2e/              # Playwright E2E 测试
├── Dockerfile        # 多阶段构建
└── pyproject.toml    # Python 项目配置
```

## API 接口

- `GET /api/health` — 健康检查
- `POST /api/chat` — 聊天（SSE 流式响应）
- `POST /api/chat/reset` — 重置会话

## License

MIT
