from app.services.qdrant_service import get_qdrant_client
from app.services.embedding_service import generate_embedding


client = get_qdrant_client()

COLLECTION_NAME = "government_schemes"


def search_similar(query: str, limit: int = 3):

    query_vector = generate_embedding(query)

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=limit
    )

    return results