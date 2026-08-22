from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database.base import Base


class WeatherHistory(Base):

    __tablename__ = "weather_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    location = Column(
        String(100),
        nullable=False
    )

    temperature = Column(
        Float,
        nullable=False
    )

    humidity = Column(
        Float,
        nullable=False
    )

    rainfall = Column(
        Float,
        nullable=False
    )

    weather_condition = Column(
        String(100),
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="weather_history"
    )