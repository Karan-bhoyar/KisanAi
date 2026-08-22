from sarvamai import SarvamAI
from app.core.config import settings


client = SarvamAI(
    api_subscription_key=settings.SARVAM_API_KEY
)


def generate_voice(
    text: str,
    language: str = "hi"
):

    if not text:
        print("TTS Error: Empty text received")
        return None


    language_map = {
        "hi": "hi-IN",
        "mr": "mr-IN",
        "en": "en-IN"
    }


    speaker_map = {
        "hi": "vidya",
        "mr": "vidya",
        "en": "meera"
    }


    try:

        response = client.text_to_speech.convert(
            text=text,
            target_language_code=language_map.get(
                language,
                "hi-IN"
            ),
            speaker=speaker_map.get(
                language,
                "vidya"
            ),
            model="bulbul:v2"
        )


        if not response:
            print("TTS Error: Empty response from Sarvam")
            return None


        audio = getattr(response, "audio", None)


        if not audio:
            print("TTS Error: Audio data not found")
            return None


        return audio


    except Exception as e:

        print(
            "TTS Generation Failed:",
            str(e)
        )

        return None