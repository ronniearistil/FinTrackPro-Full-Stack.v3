from flask_restful import Api
from resources import UserResource, ProjectResource, ExpenseResource

def register_routes(app):
    api = Api(app)

    # User routes
    api.add_resource(UserResource, '/users', '/users/<int:user_id>')

    # Project routes
    api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')

    # Expense routes
    api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')



