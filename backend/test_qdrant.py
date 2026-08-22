from app.services.qdrant_service import get_qdrant_client


client = get_qdrant_client()

print(client.get_collections())