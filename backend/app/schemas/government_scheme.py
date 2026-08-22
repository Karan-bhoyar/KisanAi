from datetime import datetime

from pydantic import BaseModel


class GovernmentSchemeCreate(BaseModel):
    title: str
    description: str
    eligibility: str
    benefits: str
    documents_required: str
    official_link: str
    state: str


class GovernmentSchemeResponse(GovernmentSchemeCreate):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }