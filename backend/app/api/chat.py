from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.session import get_db

from app.models.chat import Chat
from app.models.user import User

from app.schemas.chat import ChatRequest, ChatResponse

from app.services.ai_service import get_ai_response

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


# ==========================
# Send Chat
# ==========================
@router.post("/", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    print("========== CHAT REQUEST ==========")
    print("User:", current_user.email)
    print("Message:", request.message)

    # AI Response
    ai_response = get_ai_response(request.message)

    print("AI Response:", ai_response)

    # Save Chat
    chat_history = Chat(
        user_id=current_user.id,
        message=request.message,
        response=ai_response,
    )

    db.add(chat_history)
    db.commit()
    db.refresh(chat_history)

    print("Chat Saved Successfully")
    print("=================================")

    return ChatResponse(
        message=request.message,
        response=ai_response,
    )


# ==========================
# Chat History
# ==========================
@router.get("/history")
def get_chat_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    print("========== HISTORY ==========")
    print("User:", current_user.email)

    chats = (
        db.query(Chat)
        .filter(Chat.user_id == current_user.id)
        .order_by(Chat.id.asc())
        .all()
    )

    print("Total Chats:", len(chats))
    print("=============================")

    return chats