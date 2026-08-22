from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class MarketPriceCreate(BaseModel):

    crop_name: str
    market_name: str
    district: str
    state: str

    minimum_price: float
    maximum_price: float
    modal_price: float

    arrival_date: date


class MarketPriceResponse(BaseModel):

    id: int

    crop_name: str
    market_name: str
    district: str
    state: str

    minimum_price: float
    maximum_price: float
    modal_price: float

    arrival_date: date
    created_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )