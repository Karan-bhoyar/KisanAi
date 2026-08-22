from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

from app.database.base import Base

# Import all models so Alembic can detect tables
from app.models.user import User
from app.models.farmer_profile import FarmerProfile
from app.models.chat import Chat
from app.models.disease_history import DiseaseHistory
from app.models.chat_history import ChatHistory
from app.models.government_scheme import GovernmentScheme
from app.models.weather_history import WeatherHistory
from app.models.crop_recommendation import CropRecommendation
from app.models.document import Document
from app.models.market_price import MarketPrice

# Alembic Config object
config = context.config


# Logging setup
if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# Metadata for autogenerate
target_metadata = Base.metadata


def run_migrations_offline() -> None:

    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:

    connectable = engine_from_config(
        config.get_section(
            config.config_ini_section,
            {}
        ),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()

else:
    run_migrations_online()