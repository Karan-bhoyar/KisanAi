from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class DiseaseHistory(Base):

    __tablename__ = "disease_history"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )


    image_url = Column(
        String(255),
        nullable=False
    )


    category = Column(
        String(50),
        nullable=False,
        default="Unknown"
    )


    disease_name = Column(
        String(100),
        nullable=False
    )


    confidence = Column(
        String(20),
        nullable=False,
        default="0%"
    )


    description = Column(
        Text,
        nullable=False
    )


    treatment = Column(
        Text,
        nullable=False
    )


    prevention = Column(
        Text,
        nullable=False,
        default="No prevention available."
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )


    # Relationship
    user = relationship(
        "User",
        back_populates="disease_history"
    )