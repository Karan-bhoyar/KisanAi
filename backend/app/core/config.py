from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # ==========================
    # Database
    # ==========================
    DATABASE_URL: str

    # ==========================
    # JWT Authentication
    # ==========================
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ==========================
    # AI APIs
    # ==========================
    SARVAM_API_KEY: str
    GEMINI_API_KEY: str
    OPENWEATHER_API_KEY: str 

    # ==========================
    # Qdrant
    # ==========================
    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_API_KEY: str | None = None

    # ==========================
    # Gmail SMTP
    # ==========================
    EMAIL_USERNAME: str
    EMAIL_PASSWORD: str
    EMAIL_FROM: str

    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587

    # ==========================
    # Settings
    # ==========================
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()