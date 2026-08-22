from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.base import Base


class CropRecommendation(Base):

    __tablename__ = "crop_recommendations"

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

    soil_type = Column(
        String(50),
        nullable=False
    )

    land_area = Column(
        String(50),
        nullable=False
    )

    season = Column(
        String(50),
        nullable=False
    )

    location = Column(
        String(100),
        nullable=False
    )

    recommended_crop = Column(
        String(100),
        nullable=False
    )

    reason = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )