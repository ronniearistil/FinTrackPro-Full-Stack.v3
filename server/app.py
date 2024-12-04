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
from flask_mail import Mail, Message
from flask_jwt_extended import JWTManager

# Load environment variables
load_dotenv()

# Import extensions
from extensions import db, migrate, ma, bcrypt

# Initialize Flask-Mail and JWTManager
mail = Mail()
jwt = JWTManager()

# Application Factory Function
def create_app(config_name="default"):
    app = Flask(__name__)

    # Load configuration
    from config import config
    app.config.from_object(config[config_name])

    # Ensure SQLite database URI is set if not already specified
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///instance/app.db"

    # Add the JWT secret key to the configuration
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_secret_key")  # Replace with a strong secret key

    # Flask-Mail Configuration
    app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT", 587))
    app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME", "your_email@gmail.com")
    app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD", "your_app_password")  # Use App Password
    app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
    app.config['MAIL_USE_SSL'] = os.getenv("MAIL_USE_SSL", "False").lower() == "true"

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)  # Initialize JWTManager with the Flask app

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

    # Test email route
    @app.route("/test-email", methods=["GET"])
    def test_email():
        try:
            msg = Message(
                subject="Test Email",
                sender=app.config["MAIL_USERNAME"],
                recipients=["your_test_email@gmail.com"],  # Replace with a test email address
                body="This is a test email from Flask-Mail."
            )
            mail.send(msg)
            return {"message": "Test email sent successfully"}, 200
        except Exception as e:
            return {"error": "Failed to send test email", "details": str(e)}, 500

    # Test JWT route
    @app.route("/generate-token", methods=["POST"])
    def generate_token():
        from flask import request
        data = request.get_json()
        user_id = data.get("user_id", 1)  # Replace with actual user ID logic
        token = jwt.create_access_token(identity=user_id)
        return {"token": token}, 200

    # Import and register routes
    from routes import register_routes
    register_routes(app)

    return app


if __name__ == "__main__":
    # Create app with the specified environment or default to "default"
    app = create_app(os.getenv("FLASK_ENV", "default"))
    app.run(debug=app.config["DEBUG"], port=5555)
