import os

from dotenv import load_dotenv

load_dotenv()

MODEL_REPO_ID = os.getenv("COFFEE_MODEL_REPO", "ynanxiu/qwen25-3b-coffee-lora-gguf")
MODEL_FILENAME = os.getenv("COFFEE_MODEL_FILE", "qwen25_3b_coffee_latest_q4km.gguf")
MODEL_CHAT_FORMAT = os.getenv("COFFEE_MODEL_CHAT_FORMAT", "chatml")
MODEL_LOCAL_PATH = os.getenv("COFFEE_MODEL_LOCAL_PATH", "")

N_CTX = int(os.getenv("COFFEE_N_CTX", "2048"))
N_THREADS = int(os.getenv("COFFEE_N_THREADS", "2"))
MAX_TOKENS = int(os.getenv("COFFEE_MAX_TOKENS", "512"))
TEMPERATURE = float(os.getenv("COFFEE_TEMPERATURE", "0.7"))
TOP_P = float(os.getenv("COFFEE_TOP_P", "0.9"))
TOP_K = int(os.getenv("COFFEE_TOP_K", "40"))

MAX_CONCURRENT = int(os.getenv("COFFEE_MAX_CONCURRENT", "1"))
QUEUE_TIMEOUT = int(os.getenv("COFFEE_QUEUE_TIMEOUT", "30"))

SYSTEM_PROMPT = "你是一位深耕精品咖啡行业8年的独立咖啡馆金牌咖啡师"

MAX_HISTORY_ROUNDS = int(os.getenv("COFFEE_MAX_HISTORY", "10"))
