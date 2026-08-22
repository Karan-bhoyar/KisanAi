from app.services.embedding_service import generate_embedding


text = """
PM Kisan Samman Nidhi Yojana provides financial support to farmers.
"""


vector = generate_embedding(text)


print("Vector size:", len(vector))
print(vector[:5])