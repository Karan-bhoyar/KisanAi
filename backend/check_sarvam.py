from sarvamai import SarvamAI
from app.core.config import settings


client = SarvamAI(
    api_subscription_key=settings.SARVAM_API_KEY
)


print(client)
print(dir(client))
print(dir(client.chat))

client.chat.completions(...)