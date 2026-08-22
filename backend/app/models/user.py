import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class UserRole(str, enum.Enum):
    FARMER = "Farmer"
    ADMIN = "Admin"
    EXPERT = "Expert"


class User(Base):

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole),
        default=UserRole.FARMER
    )

    language: Mapped[str] = mapped_column(
        String(20),
        default="English"
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Farmer Profile
    farmer_profile = relationship(
        "FarmerProfile",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    # Chat
    chats = relationship(
        "Chat",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    # Weather History
    weather_history = relationship(
        "WeatherHistory",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    # Disease History
    disease_history = relationship(
        "DiseaseHistory",
        back_populates="user",
        cascade="all, delete-orphan"
    )