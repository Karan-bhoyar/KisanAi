from pydantic import BaseModel
from datetime import datetime


class WeatherCreate(BaseModel):

    location: str
    temperature: float
    humidity: float
    rainfall: float
    weather_condition: str



class WeatherResponse(BaseModel):

    id: int
    location: str
    temperature: float
    humidity: float
    rainfall: float
    weather_condition: str
    created_at: datetime


    class Config:
        from_attributes = True