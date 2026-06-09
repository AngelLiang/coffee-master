import asyncio
from unittest.mock import MagicMock

import pytest
from httpx import ASGITransport, AsyncClient

from backend.config import MAX_CONCURRENT
from backend.chat_service import generate_stream, get_or_create_session, reset_session
from backend.main import app


async def _collect_stream(gen):
    tokens = []
    async for chunk in gen:
        tokens.append(chunk)
    return tokens


class TestSessionIsolation:
    """Test that different sessions have isolated conversation histories."""

    @pytest.fixture(autouse=True)
    def cleanup_sessions(self):
        yield
        from backend.chat_service import _sessions
        _sessions.clear()

    @pytest.mark.asyncio
    async def test_different_sessions_independent(self):
        """Two sessions should maintain separate histories."""
        h1 = get_or_create_session("session-1")
        h2 = get_or_create_session("session-2")

        await _collect_stream(generate_stream("问题A", "session-1"))
        await _collect_stream(generate_stream("问题B", "session-2"))

        assert len(h1) == 2  # user + assistant
        assert len(h2) == 2
        assert h1[0]["content"] == "问题A"
        assert h2[0]["content"] == "问题B"

    @pytest.mark.asyncio
    async def test_same_session_accumulates_history(self):
        """Messages in the same session should accumulate."""
        h = get_or_create_session("session-1")

        await _collect_stream(generate_stream("问题1", "session-1"))
        await _collect_stream(generate_stream("问题2", "session-1"))

        assert len(h) == 4  # 2 rounds x (user + assistant)
        assert h[0]["content"] == "问题1"
        assert h[2]["content"] == "问题2"

    @pytest.mark.asyncio
    async def test_reset_session(self):
        """Resetting a session should clear only that session."""
        get_or_create_session("session-1")
        get_or_create_session("session-2")

        reset_session("session-1")

        from backend.chat_service import _sessions
        assert "session-1" not in _sessions
        assert "session-2" in _sessions


class TestGenerateStream:
    """Test generate_stream unit level."""

    @pytest.mark.asyncio
    async def test_returns_tokens_and_done(self):
        result = await _collect_stream(generate_stream("你好", "test-session"))
        assert any("测试回复" in r or "token" in r for r in result)
        assert any("done" in r for r in result)

    @pytest.mark.asyncio
    async def test_error_inference_still_completes_stream(self, mock_llm):
        mock_llm.create_chat_completion = MagicMock(side_effect=RuntimeError("模拟推理失败"))
        result = await _collect_stream(generate_stream("触发错误", "test-session"))
        assert any("done" in r for r in result)


class TestConcurrencyViaAPI:
    """Test semaphore-based concurrency control through the API."""

    @pytest.mark.asyncio
    async def test_normal_request_succeeds(self):
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            resp = await client.post(
                "/api/chat",
                json={"message": "正常请求", "session_id": "api-test-1"},
            )
            assert resp.status_code == 200
            assert "text/event-stream" in resp.headers["content-type"]

    @pytest.mark.asyncio
    async def test_503_when_semaphore_exhausted(self, monkeypatch):
        monkeypatch.setattr("backend.config.QUEUE_TIMEOUT", 0)

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            from backend.routes.chat import _semaphore
            for _ in range(MAX_CONCURRENT):
                await _semaphore.acquire()

            resp = await client.post(
                "/api/chat",
                json={"message": "并发测试", "session_id": "api-test-2"},
            )
            assert resp.status_code == 503
            assert "稍后再试" in resp.json()["error"]

            for _ in range(MAX_CONCURRENT):
                _semaphore.release()

    @pytest.mark.asyncio
    async def test_sequential_requests_succeed(self):
        """With MAX_CONCURRENT=1, requests should succeed one after another."""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            r1 = await client.post("/api/chat", json={"message": "问题1", "session_id": "s1"})
            r2 = await client.post("/api/chat", json={"message": "问题2", "session_id": "s2"})
            assert r1.status_code == 200
            assert r2.status_code == 200

    @pytest.mark.asyncio
    async def test_different_sessions_via_api(self):
        """Two API sessions should have separate histories."""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            await client.post("/api/chat", json={"message": "问题A", "session_id": "api-s1"})
            await client.post("/api/chat", json={"message": "问题B", "session_id": "api-s2"})

        from backend.chat_service import _sessions
        assert _sessions["api-s1"][0]["content"] == "问题A"
        assert _sessions["api-s2"][0]["content"] == "问题B"

    @pytest.mark.asyncio
    async def test_semaphore_released_after_error(self, mock_llm):
        mock_llm.create_chat_completion = MagicMock(side_effect=RuntimeError("模拟推理失败"))

        from backend.routes.chat import _semaphore
        initial = _semaphore._value

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            await client.post("/api/chat", json={"message": "触发错误", "session_id": "err-s"})

        assert _semaphore._value == initial
