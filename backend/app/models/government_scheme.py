from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class GovernmentScheme(Base):
    __tablename__ = "government_schemes"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    eligibility: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    benefits: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    documents_required: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    official_link: Mapped[str] = mapped_column(
        String(500),
        nullable=True,
    )

    state: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )