from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Chat(Base):

    __tablename__ = "chats"


    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    message: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )


    response: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )


    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )


    user = relationship(
        "User",
        back_populates="chats"
    )