from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import Expense, Project
from schemas import ExpenseSchema
from extensions import db
from helpers import get_category


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
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            expense_data = expense_schema.load(data, partial=True)
            for key, value in expense_data.items():
                if hasattr(expense, key):
                    setattr(expense, key, value)

            expense.category = get_category(expense.name)
            db.session.commit()

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
        expense = Expense.query.get_or_404(expense_id)

        if hasattr(expense, "archived"):
            if expense.archived:
                expense.archived = False
                message = "Expense is now Active"
            else:
                expense.archived = True
                message = "Expense is now Archived"
        else:
            expense.archived = True
            message = "Expense is now Archived"

        db.session.commit()

        return {"message": message, "archived": expense.archived}, 200
