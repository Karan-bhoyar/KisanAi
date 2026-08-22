import json
from PIL import Image

from google import genai
from google.genai import types

from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def detect_disease(image_path: str):

    image = Image.open(image_path)

    prompt = """
You are an expert agricultural plant disease specialist.

Analyze the uploaded crop image carefully.

First classify the image into ONE category:

1. Healthy
2. Disease
3. Pest Damage
4. Nutrient Deficiency

If it is Disease, identify the exact disease.

If it is Pest Damage, identify the pest damage type.

If it is Nutrient Deficiency, identify which nutrient is deficient.

Return ONLY valid JSON.

{
  "category":"",
  "disease_name":"",
  "confidence":"",
  "description":"",
  "treatment":"",
  "prevention":""
}

Rules:

- Never return markdown.
- Never explain anything.
- Return ONLY JSON.
- If healthy then:
  "category":"Healthy"
  "disease_name":"Healthy Leaf"
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            image
        ],
        config=types.GenerateContentConfig(
            temperature=0.2
        )
    )

    text = response.text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "").strip()

    try:
        return json.loads(text)

    except Exception:

        return {
            "category": "Unknown",
            "disease_name": "Unknown",
            "confidence": "0%",
            "description": text,
            "treatment": "No treatment available.",
            "prevention": "Please upload a clearer image."
        }