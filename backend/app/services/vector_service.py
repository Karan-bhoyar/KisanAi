from qdrant_client.models import PointStruct
from app.services.qdrant_service import get_qdrant_client
from app.services.embedding_service import generate_embedding
from app.services.pdf_service import extract_text, chunk_text


client = get_qdrant_client()

COLLECTION_NAME = "government_schemes"


def store_pdf_vectors(file_path: str):

    text = extract_text(file_path)

    chunks = chunk_text(text)

    points = []

    for index, chunk in enumerate(chunks):

        vector = generate_embedding(chunk)

        points.append(
            PointStruct(
                id=index,
                vector=vector,
                payload={
                    "text": chunk
                }
            )
        )


    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )


    return len(points)