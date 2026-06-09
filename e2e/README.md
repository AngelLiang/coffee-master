# E2E 端到端测试集

本项目使用 [Playwright](https://playwright.dev/) 作为 E2E 测试框架。

## 目录结构

```
e2e/
├── tests/
│   ├── homepage.spec.ts      # 首页测试
│   ├── blog.spec.ts          # 博客页面测试
│   ├── about.spec.ts         # 关于我们页面测试
│   ├── api.spec.ts           # 后端 API 测试
│   ├── chat-e2e.spec.ts      # 聊天功能 E2E 测试
│   └── navigation.spec.ts    # 导航功能测试
└── README.md                 # 本文档
```

## 运行测试

### 前提条件

1. 安装 Playwright 浏览器:
```bash
npx playwright install chromium
```

2. 确保后端服务在 `http://localhost:8000` 运行:
```bash
uv run uvicorn backend.main:app
```

3. 确保前端在 `http://localhost:3000` 运行:
```bash
cd frontend && npm run dev
```

### 执行测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npx playwright test e2e/tests/homepage.spec.ts

# 调试模式（带 UI）
npm run test:ui

# 查看测试报告
npm run test:report
```

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `FRONTEND_URL` | `http://localhost:3000` | 前端地址 |
| `API_BASE` | `http://localhost:8000/api` | 后端 API 地址 |
| `CI` | - | CI 模式，启用重试 |

## 测试覆盖范围

### 首页 (`homepage.spec.ts`)
- 页面标题、导航栏、作品介绍区域、对话区域可见性
- 快捷示例按钮存在且可点击
- HuggingFace 链接正确
- Footer 可见性

### 博客 (`blog.spec.ts`)
- 博客列表页可访问
- 博客文章详情页可访问
- 文章内容正确渲染
- 返回列表导航

### 关于我们 (`about.spec.ts`)
- 页面可访问
- 技术架构信息展示
- 模型信息展示
- HuggingFace 链接可点击

### API (`api.spec.ts`)
- `/api/health` 健康检查
- `/api/chat` SSE 流式接口
- `/api/chat/reset` 重置会话

### 聊天功能 (`chat-e2e.spec.ts`)
- 发送消息后用户消息显示
- 重置按钮清空聊天记录
- 发送按钮状态（禁用/启用）

### 导航 (`navigation.spec.ts`)
- 页面间导航
- 移动端菜单展开
