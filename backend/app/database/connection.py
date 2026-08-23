from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


# ==========================================
# DATABASE URL
# ==========================================

DATABASE_URL = settings.DATABASE_URL


# ==========================================
# FORCE PSYCOPG 3
# ==========================================

if DATABASE_URL.startswith("postgresql://"):

    DATABASE_URL = DATABASE_URL.replace(
        "postgresql://",
        "postgresql+psycopg://",
        1
    )

elif DATABASE_URL.startswith("postgres://"):

    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql+psycopg://",
        1
    )


# ==========================================
# DATABASE ENGINE
# ==========================================

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True
)


# ==========================================
# SESSION
# ==========================================

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)
