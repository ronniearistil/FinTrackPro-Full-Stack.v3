from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

# Initialize Extensions
db = SQLAlchemy()
migrate = Migrate()
api = Api()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize Extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    CORS(app)

    # Register Routes
    @app.route('/')
    def home():
        return {"message": "Welcome to FinTrackPro Backend"}

    # # Ensure default user exists
    # with app.app_context():
    #     from models import User
    #     default_user_email = "default@fintrackpro.com"
    #     existing_user = User.query.filter_by(email=default_user_email).first()
    #     if not existing_user:
    #         default_user = User(name="Default User", email=default_user_email)
    #         db.session.add(default_user)
    #         db.session.commit()
    #         print("Default user created.")

    # API Endpoint to fetch all projects
    @app.route('/projects', methods=['GET'])
    def get_projects():
        from models import Project
        projects = Project.query.all()
        return jsonify([{
            "id": project.id,
            "name": project.name,
            "budgeted_cost": project.budgeted_cost,
            "actual_cost": project.actual_cost,
            "projected_revenue": project.projected_revenue,
            "actual_revenue": project.actual_revenue,
            "projected_profit": project.projected_profit,
            "actual_profit": project.actual_profit,
            "status": project.status,
            "start_date": project.start_date,
            "end_date": project.end_date,
            "progress_percentage": project.progress_percentage,
            "project_manager": project.project_manager,
            "category": project.category,
            "owner": project.owner.name if project.owner else None,
        } for project in projects])

    # API Endpoint to add a project
    @app.route('/projects', methods=['POST'])
    def add_project():
        from models import Project, User
        data = request.json
        required_fields = ['name', 'budgeted_cost', 'status', 'start_date', 'user_id']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field} is required"}), 400

        user = User.query.get(data['user_id'])
        if not user:
            return jsonify({"error": "Invalid user ID"}), 400

        project = Project(
            name=data['name'],
            budgeted_cost=data['budgeted_cost'],
            actual_cost=data.get('actual_cost', 0.0),
            projected_revenue=data.get('projected_revenue'),
            actual_revenue=data.get('actual_revenue', 0.0),
            projected_profit=data.get('projected_profit'),
            actual_profit=data.get('actual_profit', 0.0),
            status=data['status'],
            start_date=data['start_date'],
            end_date=data.get('end_date'),
            project_manager=data.get('project_manager'),
            category=data.get('category'),
            progress_percentage=data.get('progress_percentage', 0.0),
            user_id=data['user_id']
        )
        try:
            db.session.add(project)
            db.session.commit()
            return jsonify({"message": "Project added successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Failed to add project", "details": str(e)}), 500

    # API Endpoint to fetch all expenses
    @app.route('/expenses', methods=['GET'])
    def get_expenses():
        from models import Expense
        expenses = Expense.query.all()
        return jsonify([{
            "id": expense.id,
            "name": expense.name,
            "amount": expense.amount,
            "category": expense.category,
            "project_id": expense.project_id,
        } for expense in expenses])

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)








