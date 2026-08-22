from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.chat import (
    ChatRequest,
    ChatResponse
)

from app.services.rag_service import ask_kisan_ai

from app.database.session import get_db

from app.models.chat import Chat
from app.models.user import User

from app.core.security import get_current_user



router = APIRouter(
    prefix="/api",
    tags=["Chat"]
)



# ==========================
# Send Message To AI
# ==========================

@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(

    request: ChatRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    try:


        # Get AI Response with Language

        answer = ask_kisan_ai(

            request.message,

            request.language

        )


        print("===================")
        print("USER MESSAGE:", request.message)
        print("LANGUAGE:", request.language)
        print("AI ANSWER:", answer)
        print("===================")



        # Fallback if AI fails

        if not answer:

            if request.language == "mr":

                answer = (
                    "क्षमस्व, सध्या उत्तर उपलब्ध नाही."
                )

            elif request.language == "en":

                answer = (
                    "Sorry, response is not available right now."
                )

            else:

                answer = (
                    "क्षमा करें, अभी उत्तर उपलब्ध नहीं है।"
                )



        # Save Chat History

        chat_record = Chat(

            user_id=current_user.id,

            message=request.message,

            response=answer

        )


        db.add(chat_record)

        db.commit()

        db.refresh(chat_record)



        return ChatResponse(

            message=request.message,

            response=answer

        )



    except Exception as e:


        db.rollback()


        print(
            "CHAT ERROR:",
            e
        )


        raise HTTPException(

            status_code=500,

            detail="Chat service failed"

        )





# ==========================
# Chat History
# ==========================


@router.get(
    "/chat/history"
)
def get_chat_history(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):

    try:


        chats = (

            db.query(Chat)

            .filter(
                Chat.user_id == current_user.id
            )

            .order_by(
                Chat.created_at.desc()
            )

            .all()

        )


        return chats



    except Exception as e:


        print(
            "HISTORY ERROR:",
            e
        )


        raise HTTPException(

            status_code=500,

            detail="Unable to fetch chat history"

        )