from sarvamai import SarvamAI
from app.core.config import settings


client = SarvamAI(
    api_subscription_key=settings.SARVAM_API_KEY
)


def get_ai_response(
    message: str,
    language: str = "hi"
) -> str:

    if language == "mr":

        system_prompt = """
You are Kisan AI, an expert agriculture assistant.

Always reply in Marathi.

Help farmers with:
- Crop recommendation
- Plant diseases
- Fertilizers
- Irrigation
- Weather
- Government schemes

Keep answers simple, practical and farmer-friendly.
"""

    elif language == "en":

        system_prompt = """
You are Kisan AI, an expert agriculture assistant.

Always reply in English.

Help farmers with:
- Crop recommendation
- Plant diseases
- Fertilizers
- Irrigation
- Weather
- Government schemes

Keep answers simple, practical and farmer-friendly.
"""

    else:

        system_prompt = """
You are Kisan AI, an expert agriculture assistant.

Always reply in Hindi.

Help farmers with:
- Crop recommendation
- Plant diseases
- Fertilizers
- Irrigation
- Weather
- Government schemes

Keep answers simple, practical and farmer-friendly.
"""

    try:

        response = client.chat.completions(
            model="sarvam-105b",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": message
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:

        print("AI Error:", e)

        if language == "mr":
            return "क्षमस्व, सध्या उत्तर देता येत नाही."

        elif language == "en":
            return "Sorry, I'm unable to answer right now."

        return "क्षमा करें, अभी उत्तर उपलब्ध नहीं है।"