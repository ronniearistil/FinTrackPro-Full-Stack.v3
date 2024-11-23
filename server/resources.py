# resources.py

from flask_restful import Resource
from flask import request, jsonify
from marshmallow import ValidationError
from models import User, Project, Expense
from schemas import UserSchema, ProjectSchema, ExpenseSchema
from extensions import db  # Import db from extensions

class UserResource(Resource):
    def get(self, user_id=None):
        print("UserResource GET called")
        if user_id:
            user = User.query.get_or_404(user_id)
            print(f"User found: {user}")
            return {"user": user.to_dict()}, 200
        users = User.query.all()
        print(f"All users: {users}")
        return {"users": [u.to_dict() for u in users]}, 200


class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get_or_404(user_id)
            return {"user": user.to_dict()}, 200
        users = User.query.all()
        return {"users": [u.to_dict() for u in users]}, 200

    def post(self):
        try:
            # Parse the incoming JSON data
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            # Validate and deserialize the data
            user_schema = UserSchema()
            user_data = user_schema.load(data)

            # Remove 'password' from user_data and handle it separately
            password = user_data.pop('password', None)
            if not password:
                return {"error": "Password is required"}, 400

            # Create the User instance
            user = User(**user_data)
            user.set_password(password)

            # Save to the database
            db.session.add(user)
            db.session.commit()

            # Return the created user
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
            project = Project(**project_data)
            db.session.add(project)
            db.session.commit()
            return project_schema.dump(project), 201
        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
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

class ExpenseResource(Resource):
    def get(self, expense_id=None):
        expense_schema = ExpenseSchema()
        if expense_id:
            expense = Expense.query.get_or_404(expense_id)
            return expense_schema.dump(expense), 200
        expenses = Expense.query.all()
        return expense_schema.dump(expenses, many=True), 200

class ExpenseResource(Resource):
    def post(self):
        expense_schema = ExpenseSchema()
        try:
            # Parse and validate the incoming JSON
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            # Load and validate data using the schema
            expense_data = expense_schema.load(data)

            # Create a new Expense instance
            expense = Expense(**expense_data)

            # Save to the database
            db.session.add(expense)
            db.session.commit()

            # Return the created expense
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

