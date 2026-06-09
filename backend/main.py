import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.model_manager import load_model, close_model
from backend.routes.chat import router as chat_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield
    close_model()


app = FastAPI(title="咖啡大师 API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 路由
app.include_router(chat_router, prefix="/api")

# 静态文件服务（Next.js 构建产物）
static_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.exists(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")
