import asyncio
from typing import AsyncGenerator

from fastapi import APIRouter
from fastapi.responses import StreamingResponse, JSONResponse

from backend.config import MAX_CONCURRENT, QUEUE_TIMEOUT
from backend.schemas import ChatRequest, ChatResetRequest, HealthResponse
from typing import Optional
from backend.model_manager import is_ready, get_model_name
from backend.chat_service import generate_stream, reset_session

router = APIRouter()
_semaphore = asyncio.Semaphore(MAX_CONCURRENT)


async def _stream_with_limit(user_input: str, session_id: str) -> AsyncGenerator[str, None]:
    try:
        async for chunk in generate_stream(user_input, session_id):
            yield chunk
    finally:
        _semaphore.release()


@router.get("/health", response_model=HealthResponse)
async def health():
    if is_ready():
        return HealthResponse(status="ok", model_name=get_model_name())
    return HealthResponse(status="loading", model_name=get_model_name() or "unknown")


@router.post("/chat")
async def chat(req: ChatRequest):
    try:
        await asyncio.wait_for(_semaphore.acquire(), timeout=QUEUE_TIMEOUT)
    except asyncio.TimeoutError:
        return JSONResponse(
            status_code=503,
            content={"error": "当前使用人数较多，请稍后再试"},
        )

    return StreamingResponse(
        _stream_with_limit(req.message, req.session_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.post("/chat/reset")
async def chat_reset(req: Optional[ChatResetRequest] = None):
    if req and req.session_id:
        reset_session(req.session_id)
    return {"message": "会话已重置"}
