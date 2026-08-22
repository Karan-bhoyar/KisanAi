from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from app.core.config import settings
import uuid


class QdrantService:

    COLLECTION_NAME = "government_documents"

    client = QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY if settings.QDRANT_API_KEY else None,
    )

    @classmethod
    def create_collection(cls):
        collections = cls.client.get_collections().collections

        names = [c.name for c in collections]

        if cls.COLLECTION_NAME not in names:
            cls.client.create_collection(
                collection_name=cls.COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=384,
                    distance=Distance.COSINE,
                ),
            )

    @classmethod
    def upload_embeddings(cls, chunks, embeddings):
        points = []

        for chunk, embedding in zip(chunks, embeddings):
            points.append(
                PointStruct(
                    id=str(uuid.uuid4()),
                    vector=embedding,
                    payload={
                        "text": chunk
                    }
                )
            )

        cls.client.upsert(
            collection_name=cls.COLLECTION_NAME,
            points=points,
        )