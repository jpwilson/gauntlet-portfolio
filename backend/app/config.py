from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()
