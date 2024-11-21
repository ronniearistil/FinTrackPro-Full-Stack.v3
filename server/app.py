from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from sqlalchemy.sql import text

# Initialize Extensions
db = SQLAlchemy()
migrate = Migrate()
api = Api()
ma = Marshmallow()  # Initialize Marshmallow
bcrypt = Bcrypt()   # Initialize Bcrypt

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config["SQLALCHEMY_ECHO"] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    ma.init_app(app)  # Attach Marshmallow to the app
    bcrypt.init_app(app)  # Attach Bcrypt to the app
    CORS(app)

    # Health check route
    @app.route('/')
    def home():
        try:
            db.session.execute(text('SELECT 1'))
            return {"message": "Welcome to FinTrackPro Backend - Database Connected"}
        except Exception as e:
            return {"error": "Database connection failed", "details": str(e)}, 500

    # Import routes
    from routes import register_routes
    register_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)








