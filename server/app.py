# import os
# import sys
# from flask import Flask, request, jsonify, make_response
# from flask_cors import CORS
# from dotenv import load_dotenv
# from flask_mail import Mail, Message
# from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token
# from sqlalchemy.sql import text
# from extensions import db, migrate, ma, bcrypt
# from datetime import timedelta
# 
# # Load environment variables
# load_dotenv()
# 
# # Add the directory containing app.py to the Python module search path
# sys.path.append(os.path.abspath(os.path.dirname(__file__)))
# 
# # Initialize Flask-Mail and JWTManager
# mail = Mail()
# jwt = JWTManager()
# 
# 
# def create_app(config_name="default"):
#     app = Flask(__name__)
# 
#     # Load configuration
#     from config import config
#     app.config.from_object(config[config_name])
# 
#     if not app.config.get("SQLALCHEMY_DATABASE_URI"):
#         app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(os.getcwd(), 'instance', 'app.db')}"
# 
#     # JWT Token Expiration Configuration
#     app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1) 
#     app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
#     app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
# 
#     # Flask-Mail Configuration
#     app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER", "smtp.gmail.com")
#     app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT", 587))
#     app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME", "your_email@gmail.com")
#     app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD", "your_app_password")
#     app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
#     app.config["MAIL_USE_SSL"] = os.getenv("MAIL_USE_SSL", "False").lower() == "true"
# 
#     # Initialize extensions with the app
#     db.init_app(app)
#     migrate.init_app(app, db)
#     ma.init_app(app)
#     bcrypt.init_app(app)
#     mail.init_app(app)
#     jwt.init_app(app)
# 
#     # Set up CORS
#     CORS_ALLOWED_ORIGINS = app.config.get("CORS_ALLOWED_ORIGINS", "*")
#     CORS(app,supports_credentials=True, resources={r"/*": {"origins": CORS_ALLOWED_ORIGINS}})
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
#     # Test email route
#     @app.route("/test-email", methods=["POST"])
#     def test_email():
#         try:
#             data = request.get_json()
#             recipient_email = data.get("email", "your_test_email@gmail.com")
#             msg = Message(
#                 subject="Test Email",
#                 sender=app.config["MAIL_USERNAME"],
#                 recipients=[recipient_email],
#                 body="This is a test email from Flask-Mail."
#             )
#             mail.send(msg)
#             return {"message": "Test email sent successfully"}, 200
#         except Exception as e:
#             return {"error": "Failed to send test email", "details": str(e)}, 500
# 
#     # Test JWT route
#     @app.route("/generate-token", methods=["POST"])
#     def generate_token():
#         try:
#             data = request.get_json()
#             user_id = data.get("user_id", 1)
#             access_token = create_access_token(identity=user_id)
#             refresh_token = create_refresh_token(identity=user_id)
#             
#             response = make_response({"message": "Tokens generated successfully"}, 200)
#             response.set_cookie("access_token", access_token, httponly=True, secure=True)
#             response.set_cookie("refresh_token", refresh_token, httponly=True, secure=True)
#             
#             return response
#         except Exception as e:
#             return {"error": "Failed to generate token", "details": str(e)}, 500
# 
#     # Import and register routes
#     from routes import register_routes
#     register_routes(app)
# 
#     return app
# 
# 
# if __name__ == "__main__":
#     app = create_app(os.getenv("FLASK_ENV", "default"))
#     app.run(debug=app.config["DEBUG"], port=int(os.getenv("PORT", 5555)))

# Cookies Investigation V2

import os
import sys
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from dotenv import load_dotenv
from flask_mail import Mail, Message
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token
from sqlalchemy.sql import text
from extensions import db, migrate, ma, bcrypt
from datetime import timedelta

# Load environment variables
load_dotenv()

# Add the directory containing app.py to the Python module search path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Initialize Flask-Mail and JWTManager
mail = Mail()
jwt = JWTManager()


def create_app(config_name="default"):
    app = Flask(__name__)

    # Load configuration
    from config import config
    app.config.from_object(config[config_name])

    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(os.getcwd(), 'instance', 'app.db')}"

    # JWT Token Expiration Configuration
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

    # Flask-Mail Configuration
    app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT", 587))
    app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME", "your_email@gmail.com")
    app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD", "your_app_password")
    app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
    app.config["MAIL_USE_SSL"] = os.getenv("MAIL_USE_SSL", "False").lower() == "true"

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    jwt.init_app(app)

    # Set up CORS
    CORS_ALLOWED_ORIGINS = app.config.get("CORS_ALLOWED_ORIGINS", "http://localhost:3001")  # Update as needed
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": CORS_ALLOWED_ORIGINS}})

    # Health check route
    @app.route("/")
    def home():
        try:
            db.session.execute(text("SELECT 1"))
            return {"message": "Welcome to FinTrackPro Backend - Database Connected"}, 200
        except Exception as e:
            return {"error": "Database connection failed", "details": str(e)}, 500

    # Test email route
    @app.route("/test-email", methods=["POST"])
    def test_email():
        try:
            data = request.get_json()
            recipient_email = data.get("email", "your_test_email@gmail.com")
            msg = Message(
                subject="Test Email",
                sender=app.config["MAIL_USERNAME"],
                recipients=[recipient_email],
                body="This is a test email from Flask-Mail."
            )
            mail.send(msg)
            return {"message": "Test email sent successfully"}, 200
        except Exception as e:
            return {"error": "Failed to send test email", "details": str(e)}, 500

    # Test JWT route
    @app.route("/generate-token", methods=["POST"])
    def generate_token():
        try:
            data = request.get_json()
            user_id = data.get("user_id", 1)
            access_token = create_access_token(identity=user_id)
            refresh_token = create_refresh_token(identity=user_id)

            # Adjust `secure` flag based on environment
            secure = app.config["ENV"] == "production"

            response = make_response({"message": "Tokens generated successfully"}, 200)
            response.set_cookie(
                "access_token_cookie",
                access_token,
                httponly=True,
                secure=secure,
                samesite="None" if not secure else "Lax",
                max_age=3600  # 1 hour expiration
                
            )
            response.set_cookie(
                "refresh_token",
                refresh_token,
                httponly=True,
                secure=secure,
                samesite="None" if not secure else "Lax",
                max_age=604800  # 7 days expiration
            )

            return response
        except Exception as e:
            return {"error": "Failed to generate token", "details": str(e)}, 500

    # Inspect cookies route (for debugging purposes)
    @app.route("/inspect-cookies", methods=["GET"])
    def inspect_cookies():
        try:
            access_token = request.cookies.get("access_token")
            refresh_token = request.cookies.get("refresh_token")
            return {
                "access_token": access_token,
                "refresh_token": refresh_token
            }, 200
        except Exception as e:
            return {"error": "Failed to inspect cookies", "details": str(e)}, 500

    # Import and register routes
    from routes import register_routes
    register_routes(app)

    return app


if __name__ == "__main__":
    app = create_app(os.getenv("FLASK_ENV", "default"))
    app.run(debug=app.config["DEBUG"], port=int(os.getenv("PORT", 5555)))
