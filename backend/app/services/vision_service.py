import json
from PIL import Image

from google import genai
from google.genai import types

from app.core.config import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def detect_disease(image_path: str):

    image = Image.open(image_path)

    prompt = """
You are an expert agricultural plant disease specialist.

Analyze the uploaded crop image carefully.

First classify the image into exactly ONE category:

1. Healthy
2. Disease
3. Pest Damage
4. Nutrient Deficiency

If the category is Disease, identify the exact disease.

If the category is Pest Damage, identify the pest damage type.

If the category is Nutrient Deficiency, identify the deficient nutrient.

Return only valid JSON with this exact structure:

{
    "category": "Disease",
    "disease_name": "Example disease name",
    "confidence": "95%",
    "description": "Short description",
    "treatment": "Treatment recommendation",
    "prevention": "Prevention recommendation"
}

Rules:
- confidence must always be a string ending with %
- Never return markdown
- Never return code blocks
- Never return any text outside the JSON
- If the leaf is healthy, use:
  "category": "Healthy"
  "disease_name": "Healthy Leaf"
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            image
        ],
        config=types.GenerateContentConfig(
            temperature=0.2,
            response_mime_type="application/json"
        )
    )

    text = response.text.strip()

    try:

        result = json.loads(text)

        confidence = str(
            result.get("confidence", "0%")
        )

        if not confidence.endswith("%"):
            confidence += "%"

        result["confidence"] = confidence

        return result

    except Exception as e:

        print("DISEASE DETECTION JSON ERROR")
        print(type(e).__name__)
        print(e)
        print("RAW RESPONSE:")
        print(text)

        return {
            "category": "Unknown",
            "disease_name": "Unknown",
            "confidence": "0%",
            "description": "Unable to analyze the image properly.",
            "treatment": "Please upload a clearer crop image.",
            "prevention": "Please upload a clear and properly focused image."
        }