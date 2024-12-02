import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "defaultsecretkey")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fe0228e94d56dead5a85aaad9252737be70f24288191b2bf60200cbe4cc43d02")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(os.path.abspath(os.getcwd()), 'instance', 'app.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "*")
    DEBUG = False
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))  # Default: 1 hour
    JWT_TOKEN_LOCATION = ["headers"]

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    "default": Config,
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}

