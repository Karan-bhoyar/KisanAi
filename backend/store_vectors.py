from app.services.vector_service import store_pdf_vectors


count = store_pdf_vectors(
    "app/uploads/scheme.pdf"
)


print("Stored vectors:", count)