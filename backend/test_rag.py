from app.services.rag_service import ask_kisan_ai


question = "PM Kisan Yojana ka benefit kya hai?"


answer = ask_kisan_ai(question)


print(answer)