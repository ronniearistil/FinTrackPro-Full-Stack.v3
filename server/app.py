from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from sqlalchemy.sql import text  # Import SQLAlchemy's text for raw SQL queries
from sqlalchemy import MetaData

# Initialize Extensions
db = SQLAlchemy()
migrate = Migrate()
api = Api()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config["SQLALCHEMY_ECHO"] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    CORS(app)

    # Health check route
    @app.route('/')
    def home():
        try:
            db.session.execute(text('SELECT 1'))
            return {"message": "Welcome to FinTrackPro Backend - Database Connected"}
        except Exception as e:
            return {"error": "Database connection failed", "details": str(e)}, 500

    # Import routes from a separate file
    from routes import register_routes
    register_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)



