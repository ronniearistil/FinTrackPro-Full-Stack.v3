from flask import jsonify, request
from app import db
from models import User, Project, Expense

def register_routes(app):
    # User Routes
    @app.route('/users', methods=['GET'])
    def get_users():
        try:
            users = User.query.all()
            return jsonify([user.to_dict() for user in users]), 200
        except Exception as e:
            return jsonify({"error": "Failed to fetch users", "details": str(e)}), 500

    # Project Routes
    @app.route('/projects', methods=['GET'])
    def get_projects():
        try:
            projects = Project.query.all()
            return jsonify([project.to_dict() for project in projects]), 200
        except Exception as e:
            return jsonify({"error": "Failed to fetch projects", "details": str(e)}), 500

    @app.route('/projects/<int:project_id>', methods=['GET'])
    def get_project(project_id):
        try:
            project = Project.query.get(project_id)
            if project:
                return jsonify(project.to_dict()), 200
            return jsonify({"error": "Project not found"}), 404
        except Exception as e:
            return jsonify({"error": "Failed to fetch project", "details": str(e)}), 500

    # Expense Routes
    @app.route('/expenses', methods=['GET'])
    def get_expenses():
        try:
            expenses = Expense.query.all()
            return jsonify([expense.to_dict() for expense in expenses]), 200
        except Exception as e:
            return jsonify({"error": "Failed to fetch expenses", "details": str(e)}), 500

        

