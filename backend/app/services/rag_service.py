from app.services.search_service import search_similar
from app.services.sarvam_service import generate_answer



def ask_kisan_ai(
    question: str,
    language: str = "hi"
):

    results = search_similar(question)


    context = ""


    for item in results.points:

        context += (
            item.payload["text"]
            + "\n"
        )



    answer = generate_answer(

        context,

        question,

        language

    )


    return answer