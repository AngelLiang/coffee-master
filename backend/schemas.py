from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"


class ChatResetRequest(BaseModel):
    session_id: str = "default"


class HealthResponse(BaseModel):
    status: str
    model_name: str
