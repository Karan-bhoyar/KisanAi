from sarvamai import SarvamAI
from app.core.config import settings


client = SarvamAI(
    api_subscription_key=settings.SARVAM_API_KEY
)



def generate_answer(
    context: str,
    question: str,
    language: str = "hi"
):


    if language == "mr":

        system_prompt = """
You are Kisan AI assistant.

Always answer farmers in Marathi language.

Use simple Marathi words.
Give practical farming advice.
Do not use Hindi.
"""


    elif language == "en":

        system_prompt = """
You are Kisan AI assistant.

Always answer farmers in English language.

Keep answers simple and practical.
"""


    else:

        system_prompt = """
You are Kisan AI assistant.

Always answer farmers in Hindi language.

Use simple Hindi words.
Give practical farming advice.
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
                    "content": f"""
Context:
{context}


Question:
{question}
"""
                }

            ]

        )


        return response.choices[0].message.content



    except Exception as e:

        print("SARVAM ERROR:", e)

        return "क्षमा करें, अभी उत्तर उपलब्ध नहीं है।"