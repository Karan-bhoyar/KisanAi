from sarvamai import SarvamAI
from app.core.config import settings


client = SarvamAI(
    api_subscription_key=settings.SARVAM_API_KEY
)


# =====================================
# Speech To Text
# =====================================
def speech_to_text(
    audio_file,
    language: str = "hi"
) -> str:

    language_map = {
        "hi": "hi-IN",
        "mr": "mr-IN",
        "en": "en-IN"
    }

    try:

        response = client.speech_to_text.transcribe(
            file=audio_file,
            language_code=language_map.get(language, "hi-IN")
        )

        return response.transcript

    except Exception as e:

        print("Speech To Text Error:", e)

        return ""


# =====================================
# Text To Speech
# =====================================
def text_to_speech(
    text: str,
    language: str = "hi"
):

    language_map = {
        "hi": "hi-IN",
        "mr": "mr-IN",
        "en": "en-IN"
    }

    speaker_map = {
        "hi": "meera",
        "mr": "meera",
        "en": "anushka"
    }

    try:

        response = client.text_to_speech.convert(
            text=text,
            target_language_code=language_map.get(language, "hi-IN"),
            speaker=speaker_map.get(language, "meera"),
            model="bulbul:v2"
        )

        return response

    except Exception as e:

        print("Text To Speech Error:", e)

        return None