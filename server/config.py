import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "defaultsecretkey")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///instance/app.db") 
    """added instance/"""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "*")
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    "default": Config,
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}



# app.config['SECRET_KEY'] = 'c7347efa5707091b77072034a4af6de6d34ce8ca7150a75b'
