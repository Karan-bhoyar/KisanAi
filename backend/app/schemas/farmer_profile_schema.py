from datetime import datetime

from pydantic import BaseModel, ConfigDict


class FarmerProfileCreate(BaseModel):
    village: str
    district: str
    state: str
    land_area: str
    soil_type: str
    main_crop: str
    irrigation_type: str


class FarmerProfileUpdate(BaseModel):
    village: str
    district: str
    state: str
    land_area: str
    soil_type: str
    main_crop: str
    irrigation_type: str


class FarmerProfileResponse(BaseModel):
    id: int
    user_id: int
    village: str
    district: str
    state: str
    land_area: str
    soil_type: str
    main_crop: str
    irrigation_type: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)