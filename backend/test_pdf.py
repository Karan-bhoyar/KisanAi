from app.services.pdf_service import extract_text, chunk_text


text = extract_text(
    "app/uploads/scheme.pdf"
)


chunks = chunk_text(text)


print("Total characters:", len(text))
print("Total chunks:", len(chunks))

print(chunks[0])