from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import User, Project, Expense
from schemas import UserSchema, ProjectSchema, ExpenseSchema
from extensions import db

# User Resource
class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get_or_404(user_id)
            return {"user": user.to_dict()}, 200
        users = User.query.all()
        return {"users": [u.to_dict() for u in users]}, 200

    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            user_schema = UserSchema()
            user_data = user_schema.load(data)

            password = user_data.pop('password', None)
            if not password:
                return {"error": "Password is required"}, 400

            user = User(**user_data)
            user.set_password(password)

            db.session.add(user)
            db.session.commit()
            return user_schema.dump(user), 201

        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create user", "details": str(e)}, 500

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully"}, 204

    def patch(self, user_id):
        user_schema = UserSchema()
        user = User.query.get_or_404(user_id)
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400
            user_data = user_schema.load(data, partial=True)
            for key, value in user_data.items():
                if key == 'password':
                    user.set_password(value)
                else:
                    setattr(user, key, value)
            db.session.commit()
            return user_schema.dump(user), 200
        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update user", "details": str(e)}, 500


# Login Resource
class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"error": "Email and password are required."}, 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return {"error": "Invalid email or password."}, 401

        return {
            "message": "Login successful",
            "user": user.to_dict()
        }, 200

# Project Resource
class ProjectResource(Resource):
    def get(self, project_id=None):
        project_schema = ProjectSchema()
        if project_id:
            project = Project.query.get_or_404(project_id)
            return project_schema.dump(project), 200
        projects = Project.query.all()
        return project_schema.dump(projects, many=True), 200

    def post(self):
        project_schema = ProjectSchema()
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            project_data = project_schema.load(data)
            user = User.query.get(project_data["user_id"])
            if not user:
                return {"error": "User with ID {project_data['user_id']} does not exist."}, 404

            # Debugging Log
            print(f"Creating project with data: {project_data}")

            project = Project(**project_data)
            db.session.add(project)
            db.session.commit()

            # Confirm addition
            print(f"Project added: {project.to_dict()}")
            return project_schema.dump(project), 201

        except ValidationError as err:
            print(f"Validation Error: {err.messages}")
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            print(f"Error while creating project: {str(e)}")
            return {"error": "Failed to create project", "details": str(e)}, 500

    def delete(self, project_id):
        project = Project.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        return {"message": "Project deleted successfully"}, 204

    def patch(self, project_id):
        project_schema = ProjectSchema()
        project = Project.query.get_or_404(project_id)
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400
            project_data = project_schema.load(data, partial=True)
            for key, value in project_data.items():
                setattr(project, key, value)
            db.session.commit()
            return project_schema.dump(project), 200
        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update project", "details": str(e)}, 500


# Expense Resource
class ExpenseResource(Resource):
    def get(self, expense_id=None):
        expense_schema = ExpenseSchema()
        if expense_id:
            expense = Expense.query.get_or_404(expense_id)
            return expense_schema.dump(expense), 200
        expenses = Expense.query.all()
        return expense_schema.dump(expenses, many=True), 200

    def post(self):
        expense_schema = ExpenseSchema()
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            expense_data = expense_schema.load(data)
            expense = Expense(**expense_data)
            db.session.add(expense)
            db.session.commit()
            return expense_schema.dump(expense), 201

        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create expense", "details": str(e)}, 500

    def delete(self, expense_id):
        expense = Expense.query.get_or_404(expense_id)
        db.session.delete(expense)
        db.session.commit()
        return {"message": "Expense deleted successfully"}, 204

    def patch(self, expense_id):
        expense_schema = ExpenseSchema()
        expense = Expense.query.get_or_404(expense_id)
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400
            expense_data = expense_schema.load(data, partial=True)
            for key, value in expense_data.items():
                setattr(expense, key, value)
            db.session.commit()
            return expense_schema.dump(expense), 200
        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update expense", "details": str(e)}, 500

