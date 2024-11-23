# tests/__init__.py
from app import create_app
from extensions import db

def setup_test_app():
    """Create and configure the app for testing."""
    app = create_app("testing")
    app.testing = True  # Enable testing mode
    with app.app_context():
        db.create_all()
    return app
