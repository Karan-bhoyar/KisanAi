from sentence_transformers import SentenceTransformer


class EmbeddingService:
    _model = SentenceTransformer("all-MiniLM-L6-v2")

    @classmethod
    def create_embedding(cls, text: str):
        return cls._model.encode(text).tolist()

    @classmethod
    def create_embeddings(cls, chunks: list[str]):
        return cls._model.encode(chunks).tolist()