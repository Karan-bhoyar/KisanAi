from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from dotenv import load_dotenv

# Load .env file
load_dotenv()

from app.core.config import settings
from app.database.base import Base

# Import ALL models here
# Import ALL models here
from app.models.user import User
from app.models.farmer_profile import FarmerProfile
from app.models.chat import Chat
from app.models.crop_recommendation import CropRecommendation
from app.models.disease_history import DiseaseHistory
from app.models.weather_history import WeatherHistory
from app.models.government_scheme import GovernmentScheme
from app.models.market_price import MarketPrice
from app.models.document import Document

config = context.config

# Read DATABASE_URL from .env
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Configure logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Metadata for Alembic
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in offline mode."""

    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in online mode."""

    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = settings.DATABASE_URL

    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()