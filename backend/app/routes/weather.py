from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.models.weather_history import WeatherHistory

from app.schemas.weather import (
    WeatherCreate,
    WeatherResponse
)

from app.core.security import get_current_user


router = APIRouter(
    prefix="/weather",
    tags=["Weather History"]
)


@router.post(
    "/",
    response_model=WeatherResponse
)
async def create_weather_history(
    data: WeatherCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    weather = WeatherHistory(

        user_id=current_user.id,

        location=data.location,

        temperature=data.temperature,

        humidity=data.humidity,

        rainfall=data.rainfall,

        weather_condition=data.weather_condition
    )


    db.add(weather)

    db.commit()

    db.refresh(weather)


    return weather