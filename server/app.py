from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from sqlalchemy.sql import text
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Extensions
db = SQLAlchemy()
migrate = Migrate()
api = Api()
ma = Marshmallow()
bcrypt = Bcrypt()

def create_app(config_name="default"):
    app = Flask(__name__)

    # Load configuration
    from config import config
    app.config.from_object(config[config_name])

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    CORS(app, resources={r"/*": {"origins": app.config["CORS_ALLOWED_ORIGINS"]}})

    # Health check route
    @app.route("/")
    def home():
        try:
            db.session.execute(text("SELECT 1"))
            return {"message": "Welcome to FinTrackPro Backend - Database Connected"}
        except Exception as e:
            return {"error": "Database connection failed", "details": str(e)}, 500

    # Import and register routes
    from routes import register_routes
    register_routes(app)

    return app

if __name__ == "__main__":
    app = create_app(os.getenv("FLASK_ENV", "default"))
    app.run(debug=app.config["DEBUG"], port=5555)











