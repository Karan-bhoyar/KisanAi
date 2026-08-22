from fastapi import APIRouter, UploadFile, File
from app.services.sarvam_service import speech_to_text


router = APIRouter()


@router.post("/voice/stt")
async def voice_to_text(
    file:UploadFile = File(...)
):


    result = speech_to_text(file)


    return {

        "text":result

    }