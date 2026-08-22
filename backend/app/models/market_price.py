from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    DateTime,
)

from app.database.base import Base


class MarketPrice(Base):

    __tablename__ = "market_prices"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    crop_name = Column(
        String,
        nullable=False
    )

    market_name = Column(
        String,
        nullable=False
    )

    district = Column(
        String,
        nullable=False
    )

    state = Column(
        String,
        nullable=False
    )

    minimum_price = Column(
        Float,
        nullable=False
    )

    maximum_price = Column(
        Float,
        nullable=False
    )

    modal_price = Column(
        Float,
        nullable=False
    )

    arrival_date = Column(
        Date,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )