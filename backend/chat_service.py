import asyncio
import json
import threading
import time
from typing import AsyncGenerator

from backend.config import (
    SYSTEM_PROMPT,
    MAX_TOKENS,
    TEMPERATURE,
    TOP_P,
    TOP_K,
    MAX_HISTORY_ROUNDS,
)
from backend.model_manager import get_llm

_sessions: dict[str, list[dict]] = {}
_lock = threading.Lock()
_inference_lock = threading.Lock()
_LAST_CLEANUP = 0.0
_SESSION_TTL = 1800  # 30 minutes


def _cleanup_expired():
    global _LAST_CLEANUP
    now = time.time()
    if now - _LAST_CLEANUP < 60:
        return
    _LAST_CLEANUP = now
    expired = [
        sid for sid, msgs in _sessions.items()
        if not msgs or now - msgs[-1].get("_ts", 0) > _SESSION_TTL
    ]
    for sid in expired:
        del _sessions[sid]


def get_or_create_session(session_id: str) -> list[dict]:
    with _lock:
        _cleanup_expired()
        if session_id not in _sessions:
            _sessions[session_id] = []
        return _sessions[session_id]


def reset_session(session_id: str):
    with _lock:
        _sessions.pop(session_id, None)


def _build_messages(user_input: str, history: list[dict]) -> list[dict]:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    max_messages = MAX_HISTORY_ROUNDS * 2
    recent = history[-max_messages:] if max_messages > 0 else history
    messages.extend(recent)

    messages.append({"role": "user", "content": user_input})
    return messages


async def generate_stream(user_input: str, session_id: str) -> AsyncGenerator[str, None]:
    history = get_or_create_session(session_id)
    messages = _build_messages(user_input, history)

    queue: asyncio.Queue[str | None] = asyncio.Queue()
    loop = asyncio.get_event_loop()

    def _sync_generate():
        try:
            llm = get_llm()
            full_response = ""

            with _inference_lock:
                for chunk in llm.create_chat_completion(
                    messages=messages,
                    max_tokens=MAX_TOKENS,
                    temperature=TEMPERATURE,
                    top_p=TOP_P,
                    top_k=TOP_K,
                    stream=True,
                ):
                    token = chunk["choices"][0]["delta"].get("content", "")
                    if token:
                        full_response += token
                        asyncio.run_coroutine_threadsafe(queue.put(token), loop)

            now = time.time()
            with _lock:
                history.append({"role": "user", "content": user_input, "_ts": now})
                history.append({"role": "assistant", "content": full_response, "_ts": now})
        except Exception as e:
            asyncio.run_coroutine_threadsafe(
                queue.put(f"[错误] {str(e)}"), loop
            )
        finally:
            asyncio.run_coroutine_threadsafe(queue.put(None), loop)

    loop.run_in_executor(None, _sync_generate)

    while True:
        token = await queue.get()
        if token is None:
            yield "data: {\"done\": true}\n\n"
            break
        yield f"data: {json.dumps({'token': token})}\n\n"
