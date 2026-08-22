from qdrant_client import QdrantClient
from app.core.config import settings


if settings.QDRANT_API_KEY:
    client = QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY
    )
else:
    client = QdrantClient(
        url=settings.QDRANT_URL
    )


def get_qdrant_client():
    return client