from sqlalchemy.orm import Session

from app.repositories.chat_repository import ChatRepository


class ChatService:


    @staticmethod
    def chat(
        db: Session,
        user_id: int,
        message: str
    ):

        # Temporary AI response
        # Later replace with Sarvam AI

        ai_reply = (
            "Namaste! I am Kisan AI assistant. "
            "Your query is: " + message
        )


        ChatRepository.create_chat(
            db,
            user_id,
            message,
            ai_reply
        )


        return ai_reply