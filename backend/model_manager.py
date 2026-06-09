from llama_cpp import Llama

from backend.config import (
    MODEL_REPO_ID,
    MODEL_FILENAME,
    MODEL_CHAT_FORMAT,
    MODEL_LOCAL_PATH,
    N_CTX,
    N_THREADS,
)

_llm: Llama | None = None
_model_name: str = ""


def get_model_name() -> str:
    return _model_name


def is_ready() -> bool:
    return _llm is not None


def load_model():
    global _llm, _model_name

    if MODEL_LOCAL_PATH:
        _model_name = MODEL_LOCAL_PATH
        _llm = Llama(
            model_path=MODEL_LOCAL_PATH,
            n_ctx=N_CTX,
            n_threads=N_THREADS,
            verbose=False,
        )
    else:
        _model_name = f"{MODEL_REPO_ID}/{MODEL_FILENAME}"
        _llm = Llama.from_pretrained(
            repo_id=MODEL_REPO_ID,
            filename=MODEL_FILENAME,
            chat_format=MODEL_CHAT_FORMAT,
            n_ctx=N_CTX,
            n_threads=N_THREADS,
            verbose=False,
        )


def get_llm() -> Llama:
    if _llm is None:
        raise RuntimeError("模型尚未加载完成")
    return _llm


def close_model():
    global _llm
    if _llm is not None:
        _llm.close()
        _llm = None
