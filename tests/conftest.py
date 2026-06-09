from unittest.mock import patch, MagicMock

import pytest


@pytest.fixture(autouse=True)
def reset_sessions():
    from backend.chat_service import _sessions
    _sessions.clear()
    yield
    _sessions.clear()


@pytest.fixture(autouse=True)
def mock_llm():
    """Mock Llama model so tests never load the real model."""
    mock = MagicMock()

    def fake_create_chat_completion(*, messages, max_tokens, temperature, top_p, top_k, stream):
        if stream:
            return iter([
                {"choices": [{"delta": {"content": "测试回复"}}]},
                {"choices": [{"delta": {"content": ""}}]},
            ])
        return {"choices": [{"message": {"content": "测试回复"}}]}

    mock.create_chat_completion = fake_create_chat_completion

    with patch("backend.model_manager._llm", mock):
        with patch("backend.model_manager.is_ready", return_value=True):
            yield mock
