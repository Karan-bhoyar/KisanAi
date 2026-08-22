from app.services.search_service import search_similar


query = "PM Kisan Yojana ka benefit kya hai?"


results = search_similar(query)


for result in results.points:
    print("----------------")
    print("Score:", result.score)
    print("Text:")
    print(result.payload["text"])