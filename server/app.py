# # app.py
# import sys
# import os
# # Add the directory containing app.py to the Python module search path
# sys.path.append(os.path.abspath(os.path.dirname(__file__)))
# 
# from flask import Flask
# from flask_cors import CORS
# from dotenv import load_dotenv
# from sqlalchemy.sql import text
# 
# 
# # Load environment variables
# load_dotenv()
# 
# # Import extensions
# from extensions import db, migrate, ma, bcrypt
# 
# # Application Factory Function
# def create_app(config_name="default"):
#     app = Flask(__name__)
# 
#     # Load configuration
#     from config import config
#     app.config.from_object(config[config_name])
# 
#     # Ensure SQLite database URI is set if not already specified
#     if not app.config.get("SQLALCHEMY_DATABASE_URI"):
#         app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///instance/app.db"
# 
#     # Initialize extensions with the app
#     db.init_app(app)
#     migrate.init_app(app, db)
#     ma.init_app(app)
#     bcrypt.init_app(app)
# 
#     # Set up CORS
#     CORS_ALLOWED_ORIGINS = app.config.get("CORS_ALLOWED_ORIGINS", "*")
#     CORS(app, resources={r"/*": {"origins": CORS_ALLOWED_ORIGINS}})
# 
#     # Health check route
#     @app.route("/")
#     def home():
#         try:
#             db.session.execute(text("SELECT 1"))
#             return {"message": "Welcome to FinTrackPro Backend - Database Connected"}, 200
#         except Exception as e:
#             return {"error": "Database connection failed", "details": str(e)}, 500
# 
#     # Import and register routes
#     from routes import register_routes
#     register_routes(app)
# 
#     return app
# 
# 
# if __name__ == "__main__":
#     # Create app with the specified environment or default to "default"
#     app = create_app(os.getenv("FLASK_ENV", "default"))
#     app.run(debug=app.config["DEBUG"], port=5555)


# V2

# app.py
import sys
import os
# Add the directory containing app.py to the Python module search path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy.sql import text
from flask_mail import Mail

# Load environment variables
load_dotenv()

# Import extensions
from extensions import db, migrate, ma, bcrypt

# Initialize Flask-Mail
mail = Mail()

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
    mail.init_app(app)  # Initialize Flask-Mail with the app

    # Flask-Mail Configuration
    app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER", "smtp.example.com")
    app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT", 587))
    app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME", "your-email@example.com")
    app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD", "your-password")
    app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
    app.config['MAIL_USE_SSL'] = os.getenv("MAIL_USE_SSL", "False").lower() == "true"

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


if __name__ == "__main__":
    # Create app with the specified environment or default to "default"
    app = create_app(os.getenv("FLASK_ENV", "default"))
    app.run(debug=app.config["DEBUG"], port=5555)











