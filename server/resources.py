from flask_restful import Resource
from flask import request, jsonify
from marshmallow import ValidationError
from models import User, Project, Expense
from schemas import UserSchema, ProjectSchema, ExpenseSchema
from app import db

# Initialize schemas
user_schema = UserSchema()
project_schema = ProjectSchema()
expense_schema = ExpenseSchema()

class UserResource(Resource):
    def get(self, user_id=None):
        """Retrieve a user by ID or all users."""
        if user_id:
            user = User.query.get_or_404(user_id)
            return user_schema.dump(user), 200
        users = User.query.all()
        return user_schema.dump(users, many=True), 200

    def post(self):
        """Create a new user."""
        try:
            data = user_schema.load(request.get_json())
            user = User(**data)
            db.session.add(user)
            db.session.commit()
            return user_schema.dump(user), 201
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create user", "details": str(e)}, 500

    def delete(self, user_id):
        """Delete a user by ID."""
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully"}, 204

    def patch(self, user_id):
        """Update user information."""
        user = User.query.get_or_404(user_id)
        try:
            data = user_schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(user, key, value)
            db.session.commit()
            return user_schema.dump(user), 200
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update user", "details": str(e)}, 500


from flask_restful import Resource
from flask import request, jsonify
from models import User
from app import db, bcrypt

class LoginResource(Resource):
    def post(self):
        """Authenticate a user with email and password."""
        data = request.get_json()

        # Validate that email and password are provided
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"error": "Email and password are required."}, 400

        # Query user by email
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "Invalid email or password."}, 401

        # Check password
        if not user.check_password(password):
            return {"error": "Invalid email or password."}, 401

        # Success: return user details
        return {
            "message": "Login successful",
            "user": user.to_dict()
        }, 200


class ProjectResource(Resource):
    def get(self, project_id=None):
        """Retrieve a project by ID or all projects."""
        if project_id:
            project = Project.query.get_or_404(project_id)
            return project_schema.dump(project), 200
        projects = Project.query.all()
        return project_schema.dump(projects, many=True), 200

    def post(self):
        """Create a new project."""
        try:
            data = project_schema.load(request.get_json())
            project = Project(**data)
            db.session.add(project)
            db.session.commit()
            return project_schema.dump(project), 201
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create project", "details": str(e)}, 500

    def delete(self, project_id):
        """Delete a project by ID."""
        project = Project.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        return {"message": "Project deleted successfully"}, 204

    def patch(self, project_id):
        """Update project information."""
        project = Project.query.get_or_404(project_id)
        try:
            data = project_schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(project, key, value)
            db.session.commit()
            return project_schema.dump(project), 200
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update project", "details": str(e)}, 500


class ExpenseResource(Resource):
    def get(self, expense_id=None):
        """Retrieve an expense by ID or all expenses."""
        if expense_id:
            expense = Expense.query.get_or_404(expense_id)
            return expense_schema.dump(expense), 200
        expenses = Expense.query.all()
        return expense_schema.dump(expenses, many=True), 200

    def post(self):
        """Create a new expense."""
        try:
            data = expense_schema.load(request.get_json())
            expense = Expense(**data)
            db.session.add(expense)
            db.session.commit()
            return expense_schema.dump(expense), 201
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create expense", "details": str(e)}, 500

    def delete(self, expense_id):
        """Delete an expense by ID."""
        expense = Expense.query.get_or_404(expense_id)
        db.session.delete(expense)
        db.session.commit()
        return {"message": "Expense deleted successfully"}, 204

    def patch(self, expense_id):
        """Update expense information."""
        expense = Expense.query.get_or_404(expense_id)
        try:
            data = expense_schema.load(request.get_json(), partial=True)
            for key, value in data.items():
                setattr(expense, key, value)
            db.session.commit()
            return expense_schema.dump(expense), 200
        except ValidationError as err:
            return jsonify(err.messages), 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update expense", "details": str(e)}, 500
