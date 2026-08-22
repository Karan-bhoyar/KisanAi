from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    Form,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.chat import Chat
from app.models.user import User

from app.core.security import get_current_user

from app.services.voice_service import speech_to_text
from app.services.ai_service import get_ai_response
from app.services.tts_service import generate_voice



router = APIRouter(

    prefix="/api/voice",

    tags=["Voice AI"]

)





@router.post("/stt")
async def voice_chat(

    file: UploadFile = File(...),

    language: str = Form("hi"),

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):


    try:


        # Selected Language

        language = language.lower()



        if language not in [

            "hi",

            "mr",

            "en"

        ]:

            raise HTTPException(

                status_code=400,

                detail="Supported languages: hi, mr, en"

            )






        # ==========================
        # Speech To Text
        # ==========================


        question = speech_to_text(

            file.file,

            language=language

        )



        if not question:


            raise HTTPException(

                status_code=400,

                detail="Could not understand voice"

            )








        # ==========================
        # AI Response
        # ==========================


        answer = get_ai_response(

            question,

            language=language

        )






        if not answer:


            raise HTTPException(

                status_code=500,

                detail="AI response failed"

            )








        # ==========================
        # Text To Speech
        # ==========================


        audio = generate_voice(

            answer,

            language=language

        )








        # ==========================
        # Save Chat History
        # ==========================


        chat = Chat(

            user_id=current_user.id,

            message=question,

            response=answer

        )



        db.add(chat)

        db.commit()

        db.refresh(chat)








        return {


            "success": True,


            "text": question,


            "question": question,


            "answer": answer,


            "audio": audio,


            "language": language,


            "chat_id": chat.id


        }







    except HTTPException:

        raise





    except Exception as e:


        db.rollback()


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





    finally:


        await file.close()