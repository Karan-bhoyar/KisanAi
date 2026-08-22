from datetime import datetime
from pydantic import BaseModel



class ChatRequest(BaseModel):

    message: str

    language: str = "hi"



class ChatResponse(BaseModel):

    message: str

    response: str



class ChatHistoryResponse(BaseModel):

    id: int

    question: str

    answer: str

    created_at: datetime


    class Config:

        from_attributes = True