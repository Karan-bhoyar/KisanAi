from pydantic import BaseModel
from datetime import datetime


class CropRecommendationCreate(BaseModel):

    soil_type: str
    land_area: str
    season: str
    location: str


class CropRecommendationResponse(BaseModel):

    id: int
    soil_type: str
    land_area: str
    season: str
    location: str
    recommended_crop: str
    reason: str
    created_at: datetime

    class Config:
        from_attributes = True