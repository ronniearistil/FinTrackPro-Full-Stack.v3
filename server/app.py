# app.py

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy.sql import text
import os

# Load environment variables
load_dotenv()

# Import extensions
from extensions import db, migrate, ma, bcrypt

# Application Factory Function
def create_app(config_name="default"):
    app = Flask(__name__)

    # Load configuration
    from config import config
    app.config.from_object(config[config_name])

    # Ensure SQLite database URI is set if not already specified
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///instance/app.db"

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    bcrypt.init_app(app)

    # Set up CORS
    CORS_ALLOWED_ORIGINS = app.config.get("CORS_ALLOWED_ORIGINS", "*")
    CORS(app, resources={r"/*": {"origins": CORS_ALLOWED_ORIGINS}})

    # Health check route
    @app.route("/")
    def home():
        try:
            db.session.execute(text("SELECT 1"))
            return {"message": "Welcome to FinTrackPro Backend - Database Connected"}, 200
        except Exception as e:
            return {"error": "Database connection failed", "details": str(e)}, 500

    # Import and register routes
    from routes import register_routes
    register_routes(app)

    return app

# Entry point for the application
if __name__ == "__main__":
    # Create app with the specified environment or default to "default"
    app = create_app(os.getenv("FLASK_ENV", "default"))
    app.run(debug=app.config["DEBUG"], port=5555)













