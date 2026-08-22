from sqlalchemy.orm import Session

from app.models.chat_history import ChatHistory


class ChatRepository:


    @staticmethod
    def create_chat(
        db: Session,
        user_id: int,
        user_message: str,
        ai_response: str
    ):

        chat = ChatHistory(
            user_id=user_id,
            user_message=user_message,
            ai_response=ai_response
        )

        db.add(chat)
        db.commit()
        db.refresh(chat)

        return chat