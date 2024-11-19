from flask import jsonify, request
from app import db
from models import User, Project, Expense


def register_routes(app):
    # User Endpoints
    @app.route('/users', methods=['GET'])
    def get_users():
        """Fetch all users with project count."""
        try:
            users = User.query.all()
            return jsonify([{
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "project_count": user.projects.count(),
            } for user in users]), 200
        except Exception as e:
            return jsonify({"error": "Failed to fetch users", "details": str(e)}), 500

    @app.route('/users', methods=['POST'])
    def add_user():
        """Add a new user."""
        data = request.json
        required_fields = ['name', 'email']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        user = User(name=data['name'], email=data['email'])
        try:
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "User added successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Failed to add user", "details": str(e)}), 500

    # Project Endpoints
    @app.route('/projects', methods=['GET'])
    def get_projects():
        """Fetch all projects."""
        try:
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
                "start_date": project.start_date.strftime("%Y-%m-%d"),
                "end_date": project.end_date.strftime("%Y-%m-%d") if project.end_date else None,
                "progress_percentage": project.progress_percentage,
                "project_manager": project.project_manager,
                "category": project.category,
                "owner": project.owner.name if project.owner else None,
            } for project in projects]), 200
        except Exception as e:
            return jsonify({"error": "Failed to fetch projects", "details": str(e)}), 500

    @app.route('/projects', methods=['POST'])
    def add_project():
        """Add a new project."""
        data = request.json
        required_fields = ['name', 'budgeted_cost', 'status', 'start_date', 'user_id']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

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

    # Expense Endpoints
    @app.route('/expenses', methods=['GET'])
    def get_expenses():
        """Fetch all expenses."""
        try:
            expenses = Expense.query.all()
            return jsonify([{
                "id": expense.id,
                "name": expense.name,
                "amount": expense.amount,
                "category": expense.category,
                "project_id": expense.project_id,
            } for expense in expenses]), 200
        except Exception as e:
            return jsonify({"error": "Failed to fetch expenses", "details": str(e)}), 500

    @app.route('/expenses', methods=['POST'])
    def add_expense():
        """Add a new expense."""
        data = request.json
        required_fields = ['name', 'amount', 'project_id']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        project = Project.query.get(data['project_id'])
        if not project:
            return jsonify({"error": "Invalid project ID"}), 400

        expense = Expense(
            name=data['name'],
            amount=data['amount'],
            category=data.get('category', 'Uncategorized'),
            project_id=data['project_id']
        )
        try:
            db.session.add(expense)
            db.session.commit()
            return jsonify({"message": "Expense added successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Failed to add expense", "details": str(e)}), 500

