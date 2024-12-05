from flask_jwt_extended import create_access_token, set_access_cookies
from flask_restful import Resource
from flask import request, make_response
from marshmallow import ValidationError
from models import User, Project, Expense
from schemas import UserSchema, ProjectSchema, ExpenseSchema
from extensions import db

# Helper function for category determination
def get_category(expense_name):
    categories = {
        "Marketing Campaign": "Marketing",
        "Labor": "Labor",
        "Materials": "Materials",
        "Transportation": "Logistics",
        "Consultation": "Professional Services",
    }
    return categories.get(expense_name, "General")

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

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # Verify user
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return {"error": "Invalid email or password"}, 401
        user_schema = UserSchema()
        response = make_response(user_schema.dump(user),200)
        # Create token
        token = create_access_token(identity= str(user.id))
        set_access_cookies(response, token)
        # Include user details in the response
        return response
    # {
    #         "token": token,
    #         "user": {
    #             "id": user.id,
    #             "name": user.name,
    #             "email": user.email
    #         }
    #     }, 200

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
                return {"error": f"User with ID {project_data['user_id']} does not exist."}, 404

            project = Project(**project_data)
            db.session.add(project)
            db.session.commit()
            return project_schema.dump(project), 201

        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create project", "details": str(e)}, 500

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
    
    def delete(self, project_id):
        project = Project.query.get_or_404(project_id)
        db.session.delete(project)
        db.session.commit()
        return {"message": "Project deleted successfully"}, 204
    
from flask_restful import Resource
from models import Project
from extensions import db

class ProjectArchiveResource(Resource):
    def patch(self, project_id):
        # Retrieve the project or return a 404 if not found
        project = Project.query.get_or_404(project_id)

        # Toggle the status
        if project.status == "Archived":
            project.status = "In Progress"  # Or another default active status
            message = "Project is now In Progress"
        else:
            project.status = "Archived"
            message = "Project is now Archived"

        # Save changes to the database
        db.session.commit()

        return {"message": message, "status": project.status}, 200


# Expense Resource
class ExpenseResource(Resource):
    def get(self, expense_id=None):
        expense_schema = ExpenseSchema()
        if expense_id:
            expense = Expense.query.get_or_404(expense_id)
            expense_data = expense_schema.dump(expense)
            expense_data["category"] = get_category(expense.name)
            return expense_data, 200
        expenses = Expense.query.all()
        expense_data = expense_schema.dump(expenses, many=True)
        for expense in expense_data:
            expense["category"] = get_category(expense["name"])
        return expense_data, 200

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

            # Update the associated project's actual_cost
            project = Project.query.get(expense.project_id)
            if project:
                project.update_actual_cost()

            expense_data = expense_schema.dump(expense)
            expense_data["category"] = get_category(expense.name)
            return expense_data, 201

        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create expense", "details": str(e)}, 500

    def delete(self, expense_id):
        expense = Expense.query.get_or_404(expense_id)
        project_id = expense.project_id
        db.session.delete(expense)
        db.session.commit()

        # Update the associated project's actual_cost
        project = Project.query.get(project_id)
        if project:
            project.update_actual_cost()

        return {"message": "Expense deleted successfully"}, 204

    def patch(self, expense_id):
        expense_schema = ExpenseSchema()
        expense = Expense.query.get_or_404(expense_id)
        try:
            # Get incoming JSON data
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            # Validate and load data with partial=True for partial updates
            expense_data = expense_schema.load(data, partial=True)

            # Update only valid fields
            for key, value in expense_data.items():
                if hasattr(expense, key):
                    setattr(expense, key, value)

            # Update the dynamic category
            expense.category = get_category(expense.name)

            # Commit changes to the database
            db.session.commit()

            # Serialize the updated expense
            updated_expense = expense_schema.dump(expense)
            updated_expense["category"] = get_category(expense.name)
            return updated_expense, 200

        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update expense", "details": str(e)}, 500

class ExpenseArchiveResource(Resource):
    def patch(self, expense_id):
        # Retrieve the expense or return a 404 if not found
        expense = Expense.query.get_or_404(expense_id)

        # Use a derived state for the archive toggle
        if hasattr(expense, "archived"):
            if expense.archived:
                expense.archived = False
                message = "Expense is now Active"
            else:
                expense.archived = True
                message = "Expense is now Archived"
        else:
            # Simulate the `archived` state using a flag for frontend interaction
            expense.archived = True
            message = "Expense is now Archived"

        # Save changes to the database
        db.session.commit()

        return {"message": message, "archived": expense.archived}, 200
    
# Collaborators Resource
class CollaboratorsResource(Resource):
    def get(self, project_id):
        """Retrieve all collaborators for a specific project."""
        project = Project.query.get_or_404(project_id)
        return {
            "collaborators": [user.to_dict() for user in project.collaborators]
        }, 200

    def post(self, project_id):
        """Add a collaborator to a project."""
        try:
            data = request.get_json()
            if not data or "user_id" not in data:
                return {"error": "User ID is required"}, 400

            user_id = data["user_id"]
            project = Project.query.get_or_404(project_id)
            user = User.query.get_or_404(user_id)

            # Check if user is already a collaborator
            if user in project.collaborators:
                return {
                    "message": f"User {user_id} is already a collaborator on project {project_id}"
                }, 400

            # Add the user as a collaborator
            project.collaborators.append(user)
            db.session.commit()

            return {
                "message": f"User {user_id} added as a collaborator to project {project_id}",
                "collaborators": [user.to_dict() for user in project.collaborators]
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to add collaborator: {str(e)}"}, 500

    def delete(self, project_id, user_id):
        """Remove a collaborator from a project."""
        try:
            project = Project.query.get_or_404(project_id)
            user = User.query.get_or_404(user_id)

            # Check if user is a collaborator
            if user not in project.collaborators:
                return {
                    "error": f"User {user_id} is not a collaborator on project {project_id}"
                }, 404

            # Remove the user from collaborators
            project.collaborators.remove(user)
            db.session.commit()

            return {
                "message": f"User {user_id} removed from project {project_id}",
                "collaborators": [user.to_dict() for user in project.collaborators]
            }, 200
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to remove collaborator: {str(e)}"}, 500
